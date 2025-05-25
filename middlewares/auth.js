const jwt = require('jsonwebtoken');
const { UserRol, Role } = require('../models');

exports.verificarToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto');
    const userId = decoded.id;

    // 🔍 Obtener los roles del usuario
    const userRoles = await UserRol.findAll({ where: { userId } });
    const rolIds = userRoles.map(r => r.rolId);

    req.user = {
      id: userId,
      roles: rolIds,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

exports.verificarRol = (rolesPermitidos) => {
    return async (req, res, next) => {
      try {
        const userRoles = req.user.roles || []; // contiene UUIDs
  
        const rolesBD = await Role.findAll({
          where: { id: userRoles },
        });
  
        const nombresRoles = rolesBD.map(r => r.name);
        const tieneAcceso = nombresRoles.some(nombre => rolesPermitidos.includes(nombre));
  
        if (!tieneAcceso) {
          return res.status(403).json({ error: 'Acceso denegado por rol' });
        }
  
        next();
      } catch (error) {
        return res.status(500).json({ error: 'Error al verificar el rol' });
      }
    };
  };

// // Verifica si el token es válido
// exports.verificarToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

//   if (!token) return res.status(401).json({ error: 'Token requerido' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto');
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(403).json({ error: 'Token inválido o expirado' });
//   }
// };

// // Middleware para verificar si el usuario tiene rol permitido
// exports.verificarRol = (rolesPermitidos) => {
//   return (req, res, next) => {
//     const userRoles = req.user.roles || [];
//     const tieneAcceso = userRoles.some(r => rolesPermitidos.includes(r));
//     if (!tieneAcceso) {
//       return res.status(403).json({ error: 'Acceso denegado por rol' });
//     }
//     next();
//   };
// };






// const jwt = require('jsonwebtoken');

// // Middleware para verificar token
// const verificarToken = (req, res, next) => {
//     const token = req.header('Authorization')?.split(' ')[1];
//     if (!token) {
//         console.log("Token no proporcionado");
//         return res.status(401).json({ error: 'Token no proporcionado' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto');
//         console.log("Token decodificado correctamente:", decoded); // Mostrar contenido del token

//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.log("Error al verificar el token:", error.message); // Mostrar mensaje de error
//         return res.status(403).json({ error: 'Token inválido' });
//     }
// };


// const verificarRol = (rolesPermitidos) => (req, res, next) => {
//     console.log("Roles permitidos:", rolesPermitidos); // Depuración
//     console.log("Rol del usuario:", req.user.rol); // Depuración

//     // Comparar el rol del usuario con los roles permitidos
//     if (!rolesPermitidos.includes(req.user.rol)) {
//         console.log("Acceso denegado. Rol no permitido."); // Depuración
//         return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
//     }

//     console.log("Acceso permitido. Rol válido."); // Depuración
//     next();
// };

// module.exports = { verificarToken, verificarRol };

