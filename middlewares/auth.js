const jwt = require('jsonwebtoken');

// Middleware para verificar token
const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        console.log("Token no proporcionado");
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto');
        console.log("Token decodificado correctamente:", decoded); // Mostrar contenido del token

        req.user = decoded;
        next();
    } catch (error) {
        console.log("Error al verificar el token:", error.message); // Mostrar mensaje de error
        return res.status(403).json({ error: 'Token inválido' });
    }
};

// Middleware para verificar roles específicos
// const verificarRol = (rolesPermitidos) => (req, res, next) => {
//     const { rol } = req.user; // El rol viene del token decodificado
//     if (!rolesPermitidos.includes(rol)) {
//         return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
//     }
//     next();
// };

const verificarRol = (rolesPermitidos) => (req, res, next) => {
    console.log("Roles permitidos:", rolesPermitidos); // Depuración
    console.log("Rol del usuario:", req.user.rol); // Depuración

    // Comparar el rol del usuario con los roles permitidos
    if (!rolesPermitidos.includes(req.user.rol)) {
        console.log("Acceso denegado. Rol no permitido."); // Depuración
        return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
    }

    console.log("Acceso permitido. Rol válido."); // Depuración
    next();
};

module.exports = { verificarToken, verificarRol };

