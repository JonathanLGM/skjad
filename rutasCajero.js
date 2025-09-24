const express = require('express');
const enrutador = express.Router();
const cajeroControlador = require('../controladores/cajeroControlador');

// CRUD de Cajero
enrutador.post('/registrar', cajeroControlador.registrarCajero);
enrutador.get('/listar', cajeroControlador.listarCajeros);
enrutador.put('/actualizar/:id_cajero', cajeroControlador.actualizarCajero);
enrutador.delete('/eliminar/:id_cajero', cajeroControlador.borrarCajero);

module.exports = enrutador;
