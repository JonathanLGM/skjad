const jwt = require('jsonwebtoken');
// secrets.js
const SECRET_USER = 'KJh82kjsdf87sd9fsd7f87sd98fsd87';   // clave segura inventada
const SECRET_ADMIN = 'JH98fsd87sdf87sdf7sdf87sd8f7sd8f';

// Middleware para verificar token JWT
const verificarToken = (req, res, next) => {
  try {
    // El token debe venir en el header Authorization: "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({ mensaje: 'Token requerido', resultado: null });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(403).json({ mensaje: 'Token no proporcionado', resultado: null });
    }

    let decoded;

    // Intentar verificar con la clave de usuario
    try {
      decoded = jwt.verify(token, SECRET_USER);
    } catch (error) {
      // Si falla, probar con la clave de admin
      try {
        decoded = jwt.verify(token, SECRET_ADMIN);
      } catch (error2) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado', resultado: null });
      }
    }

    // Guardar los datos del usuario autenticado en la request
    req.user = decoded; // contiene id_usuario y rol
    next();

  } catch (err) {
    console.error('Error en verificarToken:', err);
    return res.status(500).json({ mensaje: 'Error interno al verificar token', resultado: null });
  }
};

module.exports = verificarToken;
