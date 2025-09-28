const express = require('express');
const router = express.Router();
const usuarioControlador = require('./usuarioControlador'); // ahora todo está en raíz
const { Usuario1 } = require('./db'); // Modelo Usuario

// --- CRUD Usuario ---
router.post('/registrar', usuarioControlador.registrarUsuario);
router.get('/listar', usuarioControlador.listarUsuarios);
router.get('/:id_usuario', usuarioControlador.obtenerUsuarioPorId);
router.put('/:id_usuario', usuarioControlador.actualizarUsuario);
router.delete('/:id_usuario', usuarioControlador.borrarUsuario);

// --- Login ---
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ mensaje: 'Faltan datos' });

  try {
    const usuario = await Usuario1.findOne({ where: { username } });
    if (!usuario) return res.status(401).json({ mensaje: 'Usuario no encontrado' });

    // Contraseña en texto plano (si tu proyecto así la guarda)
    if (usuario.password !== password) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    res.status(200).json({ mensaje: 'Login exitoso', resultado: usuario });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ mensaje: err.message });
  }
});

module.exports = router;
