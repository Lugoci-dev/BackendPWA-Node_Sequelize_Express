// controllers/orderController.js
const { Order, Customer } = require('../models');

// Obtener todos los pedidos
exports.obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Order.findAll({

    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pedidos.' });
  }
};

// Obtener un pedido por ID
exports.obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await Order.findByPk(req.params.id, {

    });
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el pedido.' });
  }
};

// Obtener pedidos por usuario
exports.obtenerPedidosPorUsuarioId = async (req, res) => {
  try {
    const { userId } = req.params;
    const pedidos = await Order.findAll({
      where: { userId }
    });
    if (!pedidos.length) {
      return res.status(404).json({ error: 'No se encontraron pedidos para este usuario.' });
    }
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pedidos del usuario.' });
  }
};

// Obtener pedidos del usuario autenticado (por token)
exports.obtenerPedidosPorToken = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'No se proporcionó un usuario válido.' });
    }

    const pedidos = await Order.findAll({
      where: { userId },
      include: [
        { model: User, attributes: ['username', 'email'] }
      ]
    });
    if (!pedidos.length) {
      return res.status(404).json({ error: 'No se encontraron pedidos para este usuario.' });
    }
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pedidos del usuario.' });
  }
};

// Crear un nuevo pedido
exports.crearPedido = async (req, res) => {
  try {
    const { description, purchaseCode, agree, userId, paymentId, deliveryId, shippingId, paymentMethodId } = req.body;

    const client = await Customer.findByPk(userId);
    if (!client) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const pedido = await Order.create({
      description,
      purchaseCode,
      agree,
      userId,
      paymentId,
      deliveryId,
      shippingId,
      paymentMethodId
    });

    res.status(201).json({ mensaje: 'Pedido creado correctamente', pedido });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el pedido.' });
  }
};

// Actualizar un pedido
exports.actualizarPedido = async (req, res) => {
  try {
    const { description, purchaseCode, agree, paymentId, deliveryId, shippingId, paymentMethodId } = req.body;

    const pedido = await Order.findByPk(req.params.id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    pedido.description = description || pedido.description;
    pedido.purchaseCode = purchaseCode || pedido.purchaseCode;
    pedido.agree = agree !== undefined ? agree : pedido.agree;
    pedido.paymentId = paymentId || pedido.paymentId;
    pedido.deliveryId = deliveryId || pedido.deliveryId;
    pedido.shippingId = shippingId || pedido.shippingId;
    pedido.paymentMethodId = paymentMethodId || pedido.paymentMethodId;

    await pedido.save();
    res.json({ mensaje: 'Pedido actualizado correctamente', pedido });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el pedido.' });
  }
};

// Eliminar un pedido
exports.eliminarPedido = async (req, res) => {
  try {
    const eliminado = await Order.destroy({ where: { id: req.params.id } });
    if (eliminado) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Pedido no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el pedido.' });
  }
};