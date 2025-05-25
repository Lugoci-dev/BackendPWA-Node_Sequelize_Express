// controllers/deliveryController.js
const { Delivery } = require('../models');

// Obtener todos los envíos
exports.obtenerDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.findAll();
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los envíos.' });
  }
};

// Obtener un envío por ID
exports.obtenerDeliveryPorId = async (req, res) => {
  try {
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) {
      return res.status(404).json({ error: 'Envío no encontrado' });
    }
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el envío.' });
  }
};

// Crear un nuevo envío
exports.crearDelivery = async (req, res) => {
  try {
    const { name, type, description, price } = req.body;

    // Validar campos obligatorios (asumiendo que todos son requeridos según el modelo)
    if (!name || !type || !description || !price) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados.' });
    }

    const delivery = await Delivery.create({
      name,
      type,
      description,
      price
    });

    res.status(201).json({ mensaje: 'Envío creado correctamente', delivery });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el envío.' });
  }
};

// Actualizar un envío
exports.actualizarDelivery = async (req, res) => {
  try {
    const { name, type, description, price } = req.body;

    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) {
      return res.status(404).json({ error: 'Envío no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    delivery.name = name || delivery.name;
    delivery.type = type || delivery.type;
    delivery.description = description || delivery.description;
    delivery.price = price || delivery.price;

    await delivery.save();
    res.json({ mensaje: 'Envío actualizado correctamente', delivery });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el envío.' });
  }
};

// Eliminar un envío
exports.eliminarDelivery = async (req, res) => {
  try {
    const eliminado = await Delivery.destroy({ where: { id: req.params.id } });
    if (eliminado) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Envío no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el envío.' });
  }
};