const jwt = require('jsonwebtoken');

// Claves secretas para cada rol
const SECRET_USER = 'KJh82kjsdf87sd9fsd7f87sd98fsd87';
const SECRET_ADMIN = 'JH98fsd87sdf87sdf7sdf87sd8f7sd8f';

// Middleware que devuelve una función según el rol esperado
function verificarToken(rolEsperado) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers?.authorization;
      if (!authHeader) return res.status(401).json({ mensaje: 'Token requerido' });

      const token = authHeader.split(' ')[1];
      if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });

      let decoded;

      // Verifica según el rol esperado
      if (rolEsperado === 'usuario') {
        decoded = jwt.verify(token, SECRET_USER);
      } else if (rolEsperado === 'admin') {
        decoded = jwt.verify(token, SECRET_ADMIN);
      } else {
        return res.status(500).json({ mensaje: 'Rol desconocido' });
      }

      // Chequea que el token corresponda al rol
      if (decoded.rol !== rolEsperado) {
        return res.status(403).json({ mensaje: 'No tienes permisos para esta ruta' });
      }

      req.user = decoded;
      next();

    } catch (err) {
      console.error('Error en verificarToken:', err);
      return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
  };
}

module.exports = verificarToken;
