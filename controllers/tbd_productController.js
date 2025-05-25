// controllers/productController.js
const { Product } = require('../models');

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Product.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
};

// Obtener un producto por ID
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Product.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto.' });
  }
};

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;

    // Validar campos obligatorios (asumiendo que todos son requeridos según el modelo)
    if (!name || !description || !price || !stock || !categoryId) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados.' });
    }

    const producto = await Product.create({
      name,
      description,
      price,
      stock,
      categoryId
    });

    res.status(201).json({ mensaje: 'Producto creado correctamente', producto });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto.' });
  }
};

// Actualizar un producto
exports.actualizarProducto = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;

    const producto = await Product.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    producto.name = name || producto.name;
    producto.description = description || producto.description;
    producto.price = price || producto.price;
    producto.stock = stock || producto.stock;
    producto.categoryId = categoryId || producto.categoryId;

    await producto.save();
    res.json({ mensaje: 'Producto actualizado correctamente', producto });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto.' });
  }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
  try {
    const eliminado = await Product.destroy({ where: { id: req.params.id } });
    if (eliminado) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto.' });
  }
};