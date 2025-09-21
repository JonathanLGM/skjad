const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// Importar rutas
const clienteRouter = require(path.join(__dirname, 'rutas', 'cliente'));
const cuentaRouter = require(path.join(__dirname, 'rutas', 'cuenta'));
const usuarioRouter = require(path.join(__dirname, 'rutas', 'usuario'));

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Para recibir JSON en req.body

// Servir frontend estático
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Rutas del backend
app.use('/cliente', clienteRouter);
app.use('/cuenta', cuentaRouter);
app.use('/usuario', usuarioRouter);

// Endpoint por defecto para Render
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'cliente.html'));
});

// Puerto dinámico de Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
