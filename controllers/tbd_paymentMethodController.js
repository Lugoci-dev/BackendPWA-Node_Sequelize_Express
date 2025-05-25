// controllers/paymentMethodController.js
const { PaymentMethod } = require('../models');

// Obtener todos los métodos de pago
exports.obtenerMetodosPago = async (req, res) => {
  try {
    const metodosPago = await PaymentMethod.findAll();
    res.json(metodosPago);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los métodos de pago.' });
  }
};

// Obtener un método de pago por ID
exports.obtenerMetodoPagoPorId = async (req, res) => {
  try {
    const metodoPago = await PaymentMethod.findByPk(req.params.id);
    if (!metodoPago) {
      return res.status(404).json({ error: 'Método de pago no encontrado' });
    }
    res.json(metodoPago);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el método de pago.' });
  }
};

// Crear un nuevo método de pago
exports.crearMetodoPago = async (req, res) => {
  try {
    const { name, link, description } = req.body;

    // Validar campos obligatorios (asumiendo que todos son requeridos según el modelo)
    if (!name || !link || !description) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados.' });
    }

    const metodoPago = await PaymentMethod.create({
      name,
      link,
      description
    });

    res.status(201).json({ mensaje: 'Método de pago creado correctamente', metodoPago });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el método de pago.' });
  }
};

// Actualizar un método de pago
exports.actualizarMetodoPago = async (req, res) => {
  try {
    const { name, link, description } = req.body;

    const metodoPago = await PaymentMethod.findByPk(req.params.id);
    if (!metodoPago) {
      return res.status(404).json({ error: 'Método de pago no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    metodoPago.name = name || metodoPago.name;
    metodoPago.link = link || metodoPago.link;
    metodoPago.description = description || metodoPago.description;

    await metodoPago.save();
    res.json({ mensaje: 'Método de pago actualizado correctamente', metodoPago });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el método de pago.' });
  }
};

// Eliminar un método de pago
exports.eliminarMetodoPago = async (req, res) => {
  try {
    const eliminado = await PaymentMethod.destroy({ where: { id: req.params.id } });
    if (eliminado) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Método de pago no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el método de pago.' });
  }
};