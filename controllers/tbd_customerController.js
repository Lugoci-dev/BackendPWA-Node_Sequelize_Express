// controllers/customerController.js
const { Customer, Role, UserRol } = require('../models');

// Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Customer.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los clientes.' });
  }
};

// Obtener un cliente por ID
exports.obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await Customer.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el cliente.' });
  }
};

// Obtener clientes por userId
exports.obtenerClientesPorUsuarioId = async (req, res) => {
  try {
    const { userId } = req.params;
    const clientes = await Customer.findAll({ where: { userId } });
    if (!clientes.length) {
      return res.status(404).json({ error: 'No se encontraron clientes para este usuario.' });
    }
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los clientes del usuario.' });
  }
};

// Crear un nuevo cliente
exports.crearCliente = async (req, res) => {
  try {
    const { userId, dni, name, lastname, address, state, country } = req.body;

    // Validar campos obligatorios
    if (!userId || !dni || !name || !lastname || !address || !state || !country) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados.' });
    }

    const rolCliente = await Role.findOne({ where: { name: 'Client' } });
    if (!rolCliente) return res.status(500).json({ error: 'Rol cliente no configurado' });

    await UserRol.create({ userId: userId, rolId: rolCliente.id });

    const cliente = await Customer.create({
      userId,
      dni,
      name,
      lastname,
      address,
      state,
      country
    });

    res.status(201).json({ mensaje: 'Cliente creado correctamente', cliente });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el cliente.' });
  }
};

// Actualizar un cliente
exports.actualizarCliente = async (req, res) => {
  try {
    const { userId, dni, name, lastname, address, state, country } = req.body;

    const cliente = await Customer.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    cliente.userId = userId || cliente.userId;
    cliente.dni = dni || cliente.dni;
    cliente.name = name || cliente.name;
    cliente.lastname = lastname || cliente.lastname;
    cliente.address = address || cliente.address;
    cliente.state = state || cliente.state;
    cliente.country = country || cliente.country;

    await cliente.save();
    res.json({ mensaje: 'Cliente actualizado correctamente', cliente });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el cliente.' });
  }
};

// Eliminar un cliente
exports.eliminarCliente = async (req, res) => {
  try {
    const eliminado = await Customer.destroy({ where: { id: req.params.id } });
    if (eliminado) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el cliente.' });
  }
};