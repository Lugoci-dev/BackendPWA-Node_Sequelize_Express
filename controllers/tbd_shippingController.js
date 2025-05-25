// controllers/shippingController.js
const { Shipping } = require('../models');

// Obtener todos los envíos
exports.obtenerEnvios = async (req, res) => {
  try {
    const envios = await Shipping.findAll();
    res.json(envios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los envíos.' });
  }
};

// Obtener un envío por ID
exports.obtenerEnvioPorId = async (req, res) => {
  try {
    const envio = await Shipping.findByPk(req.params.id);
    if (!envio) {
      return res.status(404).json({ error: 'Envío no encontrado' });
    }
    res.json(envio);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el envío.' });
  }
};

// Crear un nuevo envío
exports.crearEnvio = async (req, res) => {
  try {
    const { dni, name, lastname, address, state, country, customerId } = req.body;

    // Validar campos obligatorios
    if (!dni || !name || !lastname || !address || !state || !country || !customerId) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados.' });
    }

    const envio = await Shipping.create({
      dni,
      name,
      lastname,
      address,
      state,
      country,
      customerId
    });

    res.status(201).json({ mensaje: 'Envío creado correctamente', envio });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el envío.' });
  }
};

// Actualizar un envío
exports.actualizarEnvio = async (req, res) => {
  try {
    const { dni, name, lastname, address, state, country, customerId } = req.body;

    const envio = await Shipping.findByPk(req.params.id);
    if (!envio) {
      return res.status(404).json({ error: 'Envío no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    envio.dni = dni || envio.dni;
    envio.name = name || envio.name;
    envio.lastname = lastname || envio.lastname;
    envio.address = address || envio.address;
    envio.state = state || envio.state;
    envio.country = country || envio.country;
    envio.customerId = customerId || envio.customerId;

    await envio.save();
    res.json({ mensaje: 'Envío actualizado correctamente', envio });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el envío.' });
  }
};

// Eliminar un envío
exports.eliminarEnvio = async (req, res) => {
  try {
    const eliminado = await Shipping.destroy({ where: { id: req.params.id } });
    if (eliminado) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Envío no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el envío.' });
  }
};
