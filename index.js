
// Integrantes:
// Regla de la Caridad Ordaz Morales                       401
// Elizabeth Rivera Roger                                  401
// Isaac Daniel Gonzalez Rodriguez                         402

// todo_ Run: 
// npm run dev

require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const usuariosRouter = require('./routes/usuarios');
const proyectosRoutes = require('./routes/proyectos');
const actividadesRoutes = require('./routes/actividades');
const ofertasRoutes = require('./routes/ofertas');
const { Rol } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/usuarios', usuariosRouter);
app.use('/proyectos', proyectosRoutes);  
app.use('/actividades', actividadesRoutes);
app.use('/ofertas', ofertasRoutes);

app.get('/', (req, res) => {
    res.send(`
        <h3 
        style="
            color: green
        ">
            Hola Mundo: ¡Servidor funcionando con NodeJs, Express y Sequelize!...
        </h3> `);
});

// sequelize.sync({ alter: true })
//     .then(() => {
//         console.log('¡Base de datos sincronizada correctamente!');

//         app.listen(PORT, () => {
//             console.log(`Servidor corriendo en http://localhost:${PORT}`);
//         });
//     })
//     .catch((error) => {
//         console.error('Error al sincronizar la base de datos:', error);
//     });

sequelize.sync({ alter: true })
    .then(async () => {
        console.log('¡Base de datos sincronizada correctamente!');

        // Crear roles iniciales
        await Rol.findOrCreate({ where: { nombre: 'admin' } });
        await Rol.findOrCreate({ where: { nombre: 'cliente' } });

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });