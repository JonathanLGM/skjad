const jwt = require('jsonwebtoken');
const SECRET_USER = 'KJh82kjsdf87sd9fsd7f87sd98fsd87';
const SECRET_ADMIN = 'JH98fsd87sdf87sdf7sdf87sd8f7sd8f';

const verificarToken = (rolEsperado) => (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    if (!authHeader) return res.status(403).send('Acceso denegado: token requerido');

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(403).send('Acceso denegado: token no proporcionado');

    let decoded;
    try { decoded = jwt.verify(token, SECRET_USER); }
    catch { decoded = jwt.verify(token, SECRET_ADMIN); }

    // Validar rol
    if (rolEsperado && decoded.rol !== rolEsperado) return res.status(403).send('Acceso denegado: rol incorrecto');

    req.user = decoded;
    next();
  } catch (err) {
    console.error('Error verificarToken:', err);
    return res.status(401).send('Token inválido o expirado');
  }
};

module.exports = verificarToken;
