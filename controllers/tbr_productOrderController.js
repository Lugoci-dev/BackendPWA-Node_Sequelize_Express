// controllers/productOrderController.js
const { ProductOrder } = require('../models');
const { Op } = require('sequelize'); // Asegúrate de que Op esté importado

// Obtener todos los registros de ProductOrder
exports.obtenerProductOrders = async (req, res) => {
  try {
    const productOrders = await ProductOrder.findAll();
    res.json(productOrders);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los registros de ProductOrder.' });
  }
};

// Obtener un registro de ProductOrder por ID
exports.obtenerProductOrderPorId = async (req, res) => {
  try {
    const productOrder = await ProductOrder.findByPk(req.params.id);
    if (!productOrder) {
      return res.status(404).json({ error: 'Registro de ProductOrder no encontrado' });
    }
    res.json(productOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el registro de ProductOrder.' });
  }
};

// Crear un nuevo registro de ProductOrder
exports.crearProductOrder = async (req, res) => {
  try {
    const { description, amount, totalAmount, productId, orderId } = req.body;

    // Validar campos obligatorios (asumiendo que todos son requeridos según el modelo)
    if (!description || !amount || !totalAmount || !productId || !orderId) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados.' });
    }

    const productOrder = await ProductOrder.create({
      description,
      amount,
      totalAmount,
      productId,
      orderId
    });

    res.status(201).json({ mensaje: 'Registro de ProductOrder creado correctamente', productOrder });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el registro de ProductOrder.' });
  }
};

// Actualizar un registro de ProductOrder
exports.actualizarProductOrder = async (req, res) => {
  try {
    const { description, amount, totalAmount, productId, orderId } = req.body;

    const productOrder = await ProductOrder.findByPk(req.params.id);
    if (!productOrder) {
      return res.status(404).json({ error: 'Registro de ProductOrder no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    productOrder.description = description || productOrder.description;
    productOrder.amount = amount || productOrder.amount;
    productOrder.totalAmount = totalAmount || productOrder.totalAmount;
    productOrder.productId = productId || productOrder.productId;
    productOrder.orderId = orderId || productOrder.orderId;

    await productOrder.save();
    res.json({ mensaje: 'Registro de ProductOrder actualizado correctamente', productOrder });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el registro de ProductOrder.' });
  }
};

// Eliminar un registro de ProductOrder
exports.eliminarProductOrder = async (req, res) => {
  try {
    const eliminado = await ProductOrder.destroy({ where: { id: req.params.id } });
    if (eliminado) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Registro de ProductOrder no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el registro de ProductOrder.' });
  }
};

exports.eliminarProductOrdersPorIds = async (req, res) => {
  try {
    const idsAEliminar = req.body.ids || req.body;

    if (!Array.isArray(idsAEliminar) || idsAEliminar.length === 0) {
      return res.status(400).json({ error: 'Se requiere un array de IDs en el cuerpo de la petición.' });
    }

    const cantidadEliminada = await ProductOrder.destroy({
      where: {
        id: {
          [Op.in]: idsAEliminar
        }
      }
    });

    if (cantidadEliminada > 0) {
      res.status(200).json({ message: `${cantidadEliminada} registros de ProductOrder eliminados exitosamente.` });
    } else {
      res.status(404).json({ error: 'Ningún registro de ProductOrder encontrado con los IDs proporcionados.' });
    }
  } catch (error) {
    console.error('Error al eliminar múltiples registros de ProductOrder:', error);
    res.status(500).json({ error: 'Error interno del servidor al eliminar los registros de ProductOrder.' });
  }
};