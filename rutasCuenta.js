const express = require('express');
const router = express.Router();
const cuentaControlador = require('./cuentaControlador'); // ahora todo está en raíz

// Crear cuenta
router.post('/', cuentaControlador.registrarCuenta);

// Obtener todas las cuentas
router.get('/', cuentaControlador.listarCuentas);

// Obtener una cuenta por id
router.get('/:id_cuenta', cuentaControlador.obtenerCuentaPorId);

// Actualizar cuenta
router.put('/:id_cuenta', cuentaControlador.actualizarCuenta);

// Eliminar cuenta
router.delete('/:id_cuenta', cuentaControlador.borrarCuenta);

// 🔹 Nuevo: obtener cuenta por id_cliente
router.get('/cliente/:id_cliente', cuentaControlador.obtenerCuentaPorCliente);

module.exports = router;
