const { User, Role, UserRol } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro
exports.registroUsuario = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existe = await User.findOne({ where: { email } });
    if (existe) return res.status(400).json({ error: 'Email ya registrado' });

    const existeUsername = await User.findOne({ where: { username } });
    if (existeUsername) return res.status(400).json({ error: 'Username ya registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await User.create({ username, email, password: hashedPassword });

    // Por defecto asignamos rol CLIENTE (id = 2)
    // await UserRol.create({ userId: nuevoUsuario.id, rolId: 2 });

    // const rolCliente = await Role.findOne({ where: { name: 'Client' } });
    // if (!rolCliente) return res.status(500).json({ error: 'Rol cliente no configurado' });

    // await UserRol.create({ userId: nuevoUsuario.id, rolId: rolCliente.id });

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error en el registro' });
  }
};

// Login
exports.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await User.findOne({ where: { email } });

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, usuario.password);
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Obtener roles
    const userRoles = await UserRol.findAll({ where: { userId: usuario.id } });
    const rolIds = userRoles.map(r => r.rolId);

    const token = jwt.sign(
      { id: usuario.id, roles: rolIds },
      process.env.JWT_SECRET || 'secreto',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Perfil autenticado
exports.obtenerPerfilUsuario = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    const roles = await UserRol.findAll({ where: { userId: req.user.id } });
    const nombresRoles = await Promise.all(
      roles.map(async (ur) => {
        const rol = await Role.findByPk(ur.rolId);
        return rol?.name;
      })
    );

    res.json({ usuario, roles: nombresRoles });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
};

// Obtener usuarios (ADMIN)
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Crear usuario (ADMIN)
exports.crearUsuario = async (req, res) => {
  try {
    const { username, email, password} = req.body;

    const existe = await User.findOne({ where: { email } });
    if (existe) return res.status(400).json({ error: 'Email ya registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await User.create({ username, email, password: hashedPassword });

    // Rol explícito si se envía
    // if (rolId) await UserRol.create({ userId: nuevoUsuario.id, rolId });

    res.status(201).json({ mensaje: 'Usuario creado', id: nuevoUsuario.id });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

// Actualizar un usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const usuario = await User.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (email && email !== usuario.email) {
      const usuarioExistente = await User.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(400).json({ error: 'El email ya está registrado' });
      }
    }

    if (username && username !== usuario.username) {
      const usuarioExistentePorUsername = await User.findOne({ where: { username } });
      if (usuarioExistentePorUsername) {
        return res.status(400).json({ error: 'El username ya está registrado' });
      }
    }

    usuario.username = username || usuario.username;
    usuario.email = email || usuario.email;
    if (password) {
      usuario.password = await bcrypt.hash(password, 10);
    }

    await usuario.save();
    res.json({ mensaje: 'Usuario actualizado correctamente', usuario });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario.' });
  }
};

// Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    const eliminado = await User.destroy({ where: { id: req.params.id } });
    if (eliminado) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario.' });
  }
};

// Obtener un usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      // include: { model: Role, through: { attributes: [] }, attributes: ['name'] }
    });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario.' });
  }
};






// // controllers/userController.js
// const { User, Role, UserRole } = require('../models');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Obtener todos los usuarios
// // exports.obtenerUsuarios = async (req, res) => {
// //   try {
// //     const usuarios = await User.findAll({
// //       attributes: { exclude: ['password'] },
// //       include: { model: Role, through: { attributes: [] }, attributes: ['name'] }
// //     });
// //     res.json(usuarios);
// //   } catch (error) {
// //     res.status(500).json({ error: 'Error al obtener los usuarios.' });
// //   }
// // };
// exports.obtenerUsuarios = async (req, res) => {
//     try {
//       const usuarios = await User.findAll({
//         attributes: { exclude: ['password'] },
//         // include: [
//         //   {
//         //     model: Role,
//         //     through: { attributes: [] },
//         //     attributes: ['name'],
//         //     required: false // Hace que la relación sea opcional
//         //   }
//         // ]
//       });
//       res.json(usuarios);
//     } catch (error) {
//       res.status(500).json({ error: 'Error al obtener los usuarios.' });
//     }
//   };

// // Registro de usuarios
// exports.registroUsuario = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     const usuarioExistente = await User.findOne({ where: { email } });
//     if (usuarioExistente) {
//       return res.status(400).json({ error: 'El email ya está registrado' });
//     }

//     const usuarioExistentePorUsername = await User.findOne({ where: { username } });
//     if (usuarioExistentePorUsername) {
//       return res.status(400).json({ error: 'El username ya está registrado' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const nuevoUsuario = await User.create({
//       username,
//       email,
//       password: hashedPassword
//     });

//     await UserRole.create({ userId: nuevoUsuario.id, rolId: 2 });

//     res.status(201).json({ mensaje: 'Usuario registrado correctamente', usuario: nuevoUsuario });
//   } catch (error) {
//     res.status(500).json({ error: 'Error al registrar el usuario.' });
//   }
// };

// // Crear usuario por admin
// exports.crearUsuario = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     const usuarioExistente = await User.findOne({ where: { email } });
//     if (usuarioExistente) {
//       return res.status(400).json({ error: 'El email ya está registrado' });
//     }

//     const usuarioExistentePorUsername = await User.findOne({ where: { username } });
//     if (usuarioExistentePorUsername) {
//       return res.status(400).json({ error: 'El username ya está registrado' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const nuevoUsuario = await User.create({
//       username,
//       email,
//       password: hashedPassword
//     });

//     res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario: nuevoUsuario });
//   } catch (error) {
//     res.status(500).json({ error: 'Error al crear el usuario.' });
//   }
// };

// // Login de usuario
// exports.loginUsuario = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const usuario = await User.findOne({ where: { email } });
//     if (!usuario) {
//       return res.status(404).json({ error: 'Usuario no encontrado' });
//     }

//     const isValid = await bcrypt.compare(password, usuario.password);
//     if (!isValid) {
//       return res.status(401).json({ error: 'Contraseña incorrecta' });
//     }

//     const token = jwt.sign(
//       { id: usuario.id },
//       process.env.JWT_SECRET || 'secreto',
//       { expiresIn: '1h' }
//     );

//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Error al iniciar sesión.' });
//   }
// };

// // Obtener perfil del usuario autenticado
// exports.obtenerPerfilUsuario = async (req, res) => {
//   try {
//     const usuario = await User.findByPk(req.user.id, {
//       attributes: { exclude: ['password'] },
//       include: { model: Role, through: { attributes: [] }, attributes: ['name'] }
//     });
//     if (!usuario) {
//       return res.status(404).json({ error: 'Usuario no encontrado' });
//     }
//     res.json(usuario);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener el perfil del usuario.' });
//   }
// };

// // Obtener un usuario por ID
// exports.obtenerUsuarioPorId = async (req, res) => {
//   try {
//     const usuario = await User.findByPk(req.params.id, {
//       attributes: { exclude: ['password'] },
//       // include: { model: Role, through: { attributes: [] }, attributes: ['name'] }
//     });
//     if (!usuario) {
//       return res.status(404).json({ error: 'Usuario no encontrado' });
//     }
//     res.json(usuario);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener el usuario.' });
//   }
// };

// // Actualizar un usuario
// exports.actualizarUsuario = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     const usuario = await User.findByPk(req.params.id);
//     if (!usuario) {
//       return res.status(404).json({ error: 'Usuario no encontrado' });
//     }

//     if (email && email !== usuario.email) {
//       const usuarioExistente = await User.findOne({ where: { email } });
//       if (usuarioExistente) {
//         return res.status(400).json({ error: 'El email ya está registrado' });
//       }
//     }

//     if (username && username !== usuario.username) {
//       const usuarioExistentePorUsername = await User.findOne({ where: { username } });
//       if (usuarioExistentePorUsername) {
//         return res.status(400).json({ error: 'El username ya está registrado' });
//       }
//     }

//     usuario.username = username || usuario.username;
//     usuario.email = email || usuario.email;
//     if (password) {
//       usuario.password = await bcrypt.hash(password, 10);
//     }

//     await usuario.save();
//     res.json({ mensaje: 'Usuario actualizado correctamente', usuario });
//   } catch (error) {
//     res.status(500).json({ error: 'Error al actualizar el usuario.' });
//   }
// };

// // Eliminar un usuario
// exports.eliminarUsuario = async (req, res) => {
//   try {
//     const eliminado = await User.destroy({ where: { id: req.params.id } });
//     if (eliminado) {
//       res.status(204).send();
//     } else {
//       res.status(404).json({ error: 'Usuario no encontrado' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Error al eliminar el usuario.' });
//   }
// };