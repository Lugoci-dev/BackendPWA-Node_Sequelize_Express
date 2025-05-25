
// Integrantes:
// Regla de la Caridad Ordaz Morales                       401
// Elizabeth Rivera Roger                                  401
// Isaac Daniel Gonzalez Rodriguez                         402

// todo_ Run: 
// npm run dev

const fs = require('fs'); // Para leer el archivo JSON
const path = require('path'); // Para manejar rutas

require('dotenv').config();
const express = require('express');
const cors = require('cors'); 

const usuariosRouter = require('./routes/usuarios');
const ofertasRoutes = require('./routes/ofertas');
const tdb_userRoutes = require('./routes/tbd_users');
const tdb_orderRoutes = require('./routes/tbd_orders');
const tdb_customerRoutes = require('./routes/tbd_customers');
const tdb_roleRoutes = require('./routes/tdb_roles');
const tdb_userRolRoutes = require('./routes/tbr_userRol');
const tdb_shippingRoutes = require('./routes/tbd_shippings');
const tdb_productRoutes = require('./routes/tbd_products');
const tdb_prodOrderRoutes = require('./routes/tbr_productOrders');
const tdb_deliveryRoutes = require('./routes/tbd_deliverys');
const tdb_paymentRoutes = require('./routes/tbd_payments');
const tdb_paymentMethodRoutes = require('./routes/tbd_paymentMethods');

const paymentRoutes = require('./routes/paymentRoutes');
const stripePaymentRoutes = require('./routes/stripeRoutes');


// const { sequelize } = require('./models');
// const { Rol } = require('./models');
const { sequelize, Usuario, Rol,  Oferta } = require('./models'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:9000'], // Permitir solicitudes desde el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

app.use(express.json());
app.use('/usuarios', usuariosRouter);
app.use('/ofertas', ofertasRoutes);
app.use('/api/user', tdb_userRoutes);
app.use('/api/order', tdb_orderRoutes);
app.use('/api/customer', tdb_customerRoutes);
app.use('/api/rol', tdb_roleRoutes);
app.use('/api/userRol', tdb_userRolRoutes);
app.use('/api/shipping', tdb_shippingRoutes);
app.use('/api/product', tdb_productRoutes);
app.use('/api/productOrder', tdb_prodOrderRoutes);
app.use('/api/delivery', tdb_deliveryRoutes);
app.use('/api/payment', tdb_paymentRoutes);
app.use('/api/paymentMethod', tdb_paymentMethodRoutes);

app.use('/api/payments', paymentRoutes);
app.use('/api/stripePayments', stripePaymentRoutes);

app.get('/', (req, res) => {
    res.send(`
        <h3 
        style="
            color: green
        ">
            Hola Mundo: ¡Servidor funcionando con NodeJs, Express y Sequelize!...
        </h3> `);
});

sequelize.sync({ alter: true })
    .then(async () => {
        console.log('¡Base de datos sincronizada correctamente!');

        // Crear roles iniciales
        // await Rol.findOrCreate({ where: { nombre: 'admin' } });
        // await Rol.findOrCreate({ where: { nombre: 'cliente' } });
        const [adminRole, clienteRole] = await Promise.all([
            Rol.findOrCreate({ where: { nombre: 'admin' } }),
            Rol.findOrCreate({ where: { nombre: 'cliente' } }),
        ]);

        // Crear usuarios por defecto si no existen
        const hashedPassword = require('bcryptjs').hashSync('admin123', 10);
        await Usuario.findOrCreate({
            where: { email: 'admin@example.com' },
            defaults: {
                nombre: 'Admin',
                password: hashedPassword,
                rolId: adminRole[0].id,
            },
        });
        await Usuario.findOrCreate({
            where: { email: 'cliente@example.com' },
            defaults: {
                nombre: 'Cliente',
                password: hashedPassword,
                rolId: clienteRole[0].id,
            },
        });
        console.log('Roles y usuarios creados por defecto.');

        // Leer y cargar ofertas desde el archivo JSON
        const ofertasPath = path.join(__dirname, 'data', 'ofertas.json');
        const ofertasData = JSON.parse(fs.readFileSync(ofertasPath, 'utf8'));

        for (const oferta of ofertasData) {
        await Oferta.findOrCreate({
            where: { position: oferta.position, company: oferta.company },
            defaults: oferta,
        });
        }
        console.log('Ofertas cargadas correctamente.');

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });