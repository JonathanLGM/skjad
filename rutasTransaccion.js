const express = require('express');
const router = express.Router();
const transaccionControlador = require('./transaccionControlador'); // Importar controlador

// Crear transacción
router.post('/', transaccionControlador.registrarTransaccion);

// Obtener todas las transacciones
router.get('/', transaccionControlador.listarTransacciones);

// Obtener una transacción por id
router.get('/:id_transaccion', transaccionControlador.obtenerTransaccionPorId);

// Actualizar transacción
router.put('/:id_transaccion', transaccionControlador.actualizarTransaccion);

// Eliminar transacción
router.delete('/:id_transaccion', transaccionControlador.borrarTransaccion);

module.exports = router;
