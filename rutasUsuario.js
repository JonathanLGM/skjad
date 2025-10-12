const express = require('express');
const router = express.Router();
const usuarioControlador = require('./usuarioControlador'); // ahora todo está en raíz
const { Usuario1 } = require('./db'); // Modelo Usuario
const bcrypt = require('bcrypt');

// --- CRUD Usuario ---
router.post('/registrar', usuarioControlador.registrarUsuario);
router.get('/listar', usuarioControlador.listarUsuarios);
router.get('/:id_usuario', usuarioControlador.obtenerUsuarioPorId);
router.put('/:id_usuario', usuarioControlador.actualizarUsuario);
router.delete('/:id_usuario', usuarioControlador.borrarUsuario);
router.post('/login', usuarioControlador.loginUsuario);
router.post('/logout', usuarioControlador.logoutUsuario);
// --- Obtener cuenta por username (misma estructura CRUD) ---
router.get('/cuenta-por-username/:username', usuarioControlador.obtenerCuentaPorUsername);
router.get('/rol/:username', usuarioControlador.obtenerRolPorUsername);

module.exports = router;
