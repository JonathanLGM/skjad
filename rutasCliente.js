const express = require('express');
const router = express.Router();
const clienteControlador = require('./clienteControlador'); // ahora todo está en raíz

// Crear cliente
router.post('/', clienteControlador.registrarCliente);

// Obtener todos los clientes (con alias /listar)
router.get('/listar', clienteControlador.listarClientes);

// Obtener un cliente por id
router.get('/:id_cliente', clienteControlador.obtenerClientePorId);

// Actualizar cliente
router.put('/:id_cliente', clienteControlador.actualizarCliente);

// Eliminar cliente
router.delete('/:id_cliente', clienteControlador.borrarCliente);

module.exports = router;
