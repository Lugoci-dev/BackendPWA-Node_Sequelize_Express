const { Usuario, Rol } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Obtener todos los usuarios (Solo admin)
exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['password'] }, // Excluir contraseñas
            include: { model: Rol, attributes: ['nombre'] }, // Incluir información del rol
        });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios.' });
    }
};

// Registro de clientes (Abierto a todos)
exports.registroUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Verificar si el correo ya está registrado
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        // Cifrar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario con rol cliente (rolId = 2)
        const nuevoUsuario = await Usuario.create({
            nombre,
            email,
            password: hashedPassword,
            rolId: 2, // Cliente
        });

        res.status(201).json({ mensaje: 'Usuario registrado correctamente', usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
};

// Crear usuario por admin
exports.createUsuario = async (req, res) => {
    try {
        const { nombre, email, password, rolId } = req.body;

        // Validar que el rol existe
        const rol = await Rol.findByPk(rolId);
        if (!rol) {
            return res.status(400).json({ error: 'El rol especificado no existe' });
        }

        // Verificar si el correo ya está registrado
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        // Cifrar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const nuevoUsuario = await Usuario.create({
            nombre,
            email,
            password: hashedPassword,
            rolId,
        });

        res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario.' });
    }
};

// Login de usuario
exports.loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verificar contraseña
        const isValid = await bcrypt.compare(password, usuario.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Generar token
        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rolId },
            process.env.JWT_SECRET || 'secreto',
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
};

// Obtener perfil del usuario autenticado
exports.getPerfilUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.user.id, {
            attributes: { exclude: ['password'] },
            include: { model: Rol, attributes: ['nombre'] },
        });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el perfil del usuario.' });
    }
};

exports.deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.destroy({ where: { id: req.params.id } });
        if (usuario) {
          res.status(204).send();
        } else {
          res.status(404).json({ error: 'Usuario no encontrado' });
        }
      } catch (err) {
        console.error('Error al eliminar usuario:', err);
        res.status(500).json({ error: 'Error al eliminar usuario' });
      }
};

// Obtener un usuario por ID (Nueva función)
exports.getUsuarioById = async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.params.id, {
        attributes: { exclude: ['password'] },
        include: { model: Rol, attributes: ['nombre'] },
      });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  };
  
  // Actualizar un usuario (Nueva función)
  exports.updateUsuario = async (req, res) => {
    try {
      const { nombre, email, rolId, password } = req.body;
  
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Actualizamos los datos del usuario
      usuario.nombre = nombre;
      usuario.email = email;
      usuario.rolId = rolId;
  
      // Si se envía una nueva contraseña, la ciframos
      if (password) {
        usuario.password = await bcrypt.hash(password, 10);
      }
  
      await usuario.save();
      res.json({ mensaje: 'Usuario actualizado correctamente', usuario });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar usuario' });
    }
  };