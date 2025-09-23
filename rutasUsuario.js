const express = require('express');
const router = express.Router();
const usuarioControlador = require('./usuarioControlador'); // ahora todo está en raíz

// Crear usuario
router.post('/registrar', usuarioControlador.registrarUsuario);

// Obtener todos los usuarios
router.get('/listar', usuarioControlador.listarUsuarios);

// Obtener un usuario por id
router.get('/:id_usuario', usuarioControlador.obtenerUsuarioPorId);

// Actualizar usuario
router.put('/:id_usuario', usuarioControlador.actualizarUsuario);

// Eliminar usuario
router.delete('/:id_usuario', usuarioControlador.borrarUsuario);

module.exports = router;
