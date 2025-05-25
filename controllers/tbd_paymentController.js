// controllers/paymentController.js
const { Payment } = require('../models');

// Obtener todos los pagos
exports.obtenerPagos = async (req, res) => {
  try {
    const pagos = await Payment.findAll();
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pagos.' });
  }
};

// Obtener un pago por ID
exports.obtenerPagoPorId = async (req, res) => {
  try {
    const pago = await Payment.findByPk(req.params.id);
    if (!pago) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }
    res.json(pago);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el pago.' });
  }
};

// Crear un nuevo pago
exports.crearPago = async (req, res) => {
  try {
    const { description, amount, bank, transactionCode } = req.body;

    // Validar campos obligatorios (asumiendo que todos son requeridos según el modelo)
    if (!description || !amount || !bank || !transactionCode) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados.' });
    }

    const pago = await Payment.create({
      description,
      amount,
      bank,
      transactionCode
    });

    res.status(201).json({ mensaje: 'Pago creado correctamente', pago });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el pago.' });
  }
};

// Actualizar un pago
exports.actualizarPago = async (req, res) => {
  try {
    const { description, amount, bank, transactionCode } = req.body;

    const pago = await Payment.findByPk(req.params.id);
    if (!pago) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    pago.description = description || pago.description;
    pago.amount = amount || pago.amount;
    pago.bank = bank || pago.bank;
    pago.transactionCode = transactionCode || pago.transactionCode;

    await pago.save();
    res.json({ mensaje: 'Pago actualizado correctamente', pago });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el pago.' });
  }
};

// Eliminar un pago
exports.eliminarPago = async (req, res) => {
  try {
    const eliminado = await Payment.destroy({ where: { id: req.params.id } });
    if (eliminado) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Pago no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el pago.' });
  }
};