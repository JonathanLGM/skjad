const express = require('express');
const router = express.Router();
const transaccionControlador = require('./transaccionControlador'); // importa bien

// crear transaccion
router.post('/', transaccionControlador.registrarTransaccion);

// listar todas
router.get('/listartransaccion', transaccionControlador.listarTransacciones);

// obtener por id
router.get('/:id_transaccion', transaccionControlador.obtenerTransaccionPorId);

// actualizar
router.put('/:id_transaccion', transaccionControlador.actualizarTransaccion);

// eliminar
router.delete('/:id_transaccion', transaccionControlador.borrarTransaccion);

module.exports = router;
