// rutasCajero.js
const express = require('express');
const router = express.Router();
const cajeroControlador = require('./cajeroControlador'); // igual que cliente, está en raíz

// Crear cajero
router.post('/', cajeroControlador.registrarCajero);

// Obtener todos los cajeros (con alias /listarcajero)
router.get('/listarcajero', cajeroControlador.listarCajeros);

// Obtener un cajero por id
router.get('/:id_cajero', cajeroControlador.obtenerCajeroPorId);

// Actualizar cajero
router.put('/:id_cajero', cajeroControlador.actualizarCajero);

// Eliminar cajero
router.delete('/:id_cajero', cajeroControlador.borrarCajero);

// ✅ NUEVA RUTA: obtener cajeros en formato GeoJSON (para el mapa)
router.get('/geojson/todos', cajeroControlador.obtenerCajerosGeoJSON);

module.exports = router;
