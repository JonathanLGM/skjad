const express = require('express');
const enrutador = express.Router();
const clienteControlador = require('./clienteControlador'); // como todo está en raíz

// CRUD de Cliente
enrutador.post('/registrar', clienteControlador.registrarCliente);
enrutador.get('/listar', clienteControlador.listarClientes);
enrutador.get('/buscar/:id_cliente', clienteControlador.obtenerClientePorId);
enrutador.put('/actualizar/:id_cliente', clienteControlador.actualizarCliente);
enrutador.delete('/eliminar/:id_cliente', clienteControlador.borrarCliente);

module.exports = enrutador;
