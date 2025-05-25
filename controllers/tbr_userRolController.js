// controllers/userRolController.js
const { UserRol } = require('../models');

// Obtener todos los registros de UserRol
exports.obtenerUserRoles = async (req, res) => {
  try {
    const userRoles = await UserRol.findAll();
    res.json(userRoles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los registros de UserRol.' });
  }
};

// Obtener un registro de UserRol por ID
exports.obtenerUserRolPorId = async (req, res) => {
  try {
    const userRol = await UserRol.findByPk(req.params.id);
    if (!userRol) {
      return res.status(404).json({ error: 'Registro de UserRol no encontrado' });
    }
    res.json(userRol);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el registro de UserRol.' });
  }
};

// Obtener registros de UserRol por userId
exports.obtenerUserRolesPorUsuarioId = async (req, res) => {
  try {
    const { userId } = req.params;
    const userRoles = await UserRol.findAll({ where: { userId } });
    if (!userRoles.length) {
      return res.status(404).json({ error: 'No se encontraron registros de UserRol para este usuario.' });
    }
    res.json(userRoles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los registros de UserRol del usuario.' });
  }
};

// Crear un nuevo registro de UserRol
exports.crearUserRol = async (req, res) => {
  try {
    const { userId, rolId } = req.body;

    // Validar campos obligatorios
    if (!userId || !rolId) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados.' });
    }

    const userRol = await UserRol.create({
      userId,
      rolId
    });

    res.status(201).json({ mensaje: 'Registro de UserRol creado correctamente', userRol });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el registro de UserRol.' });
  }
};

// Actualizar un registro de UserRol
exports.actualizarUserRol = async (req, res) => {
  try {
    const { userId, rolId } = req.body;

    const userRol = await UserRol.findByPk(req.params.id);
    if (!userRol) {
      return res.status(404).json({ error: 'Registro de UserRol no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    userRol.userId = userId || userRol.userId;
    userRol.rolId = rolId || userRol.rolId;

    await userRol.save();
    res.json({ mensaje: 'Registro de UserRol actualizado correctamente', userRol });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el registro de UserRol.' });
  }
};

// Eliminar un registro de UserRol
exports.eliminarUserRol = async (req, res) => {
  try {
    const eliminado = await UserRol.destroy({ where: { id: req.params.id } });
    if (eliminado) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Registro de UserRol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el registro de UserRol.' });
  }
};