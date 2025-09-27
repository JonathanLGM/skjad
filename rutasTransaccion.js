// routes/transaccionRoutes.js
const express = require('express');
const router = express.Router();
const transaccionControlador = require('./transaccionControlador'); // está en raíz, igual que clienteControlador

// Crear transacción
router.post('/', transaccionControlador.crearTransaccion);

// Obtener todas las transacciones (con alias /listar)
router.get('/listartransaccion', transaccionControlador.listarTransacciones);

// Obtener una transacción por id
router.get('/:id_transaccion', transaccionControlador.obtenerTransaccionPorId);

// Actualizar transacción
router.put('/:id_transaccion', transaccionControlador.actualizarTransaccion);

// Eliminar transacción
router.delete('/:id_transaccion', transaccionControlador.borrarTransaccion);

module.exports = router;
