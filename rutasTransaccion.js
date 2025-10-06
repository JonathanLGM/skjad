const express = require('express');
const router = express.Router();
const transaccionControlador = require('./transaccionControlador'); // Importar controlador

// Crear transacción
router.post('/', transaccionControlador.registrarTransaccion);

// Obtener todas las transacciones
router.get('/', transaccionControlador.listarTransacciones);

// Obtener una transacción por id
router.get('/:id_transaccion', transaccionControlador.obtenerTransaccionPorId);

router.post('/retirar', transaccionControlador.retirarDinero);

router.post('/consignar', transaccionControlador.consignarDinero);

module.exports = router;
