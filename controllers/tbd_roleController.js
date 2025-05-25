// controllers/roleController.js
const { Role } = require('../models');

// Obtener todos los roles
exports.obtenerRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los roles.' });
  }
};

// Obtener un rol por ID
exports.obtenerRolPorId = async (req, res) => {
  try {
    const rol = await Role.findByPk(req.params.id);
    if (!rol) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.json(rol);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el rol.' });
  }
};

// Crear un nuevo rol
exports.crearRol = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validar campos obligatorios
    if (!name || !description) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados.' });
    }

    const rol = await Role.create({
      name,
      description
    });

    res.status(201).json({ mensaje: 'Rol creado correctamente', rol });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el rol.' });
  }
};

// Actualizar un rol
exports.actualizarRol = async (req, res) => {
  try {
    const { name, description } = req.body;

    const rol = await Role.findByPk(req.params.id);
    if (!rol) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    rol.name = name || rol.name;
    rol.description = description || rol.description;

    await rol.save();
    res.json({ mensaje: 'Rol actualizado correctamente', rol });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el rol.' });
  }
};

// Eliminar un rol
exports.eliminarRol = async (req, res) => {
  try {
    const eliminado = await Role.destroy({ where: { id: req.params.id } });
    if (eliminado) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el rol.' });
  }
};