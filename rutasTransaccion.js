const express = require('express');
const router = express.Router();
const transaccionControlador = require('./transaccionControlador'); // Importar controlador

// Crear transacción
router.post('/', transaccionControlador.registrarTransaccion);

// Obtener todas las transacciones
router.get('/', transaccionControlador.listarTransacciones);

// Obtener una transacción por id
router.get('/:id_transaccion', transaccionControlador.obtenerTransaccionPorId);

module.exports = router;
