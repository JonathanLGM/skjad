const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Para recibir JSON en req.body

// Importar rutas usando rutas absolutas relativas a este archivo
const clienteRouter = require(path.join(__dirname, 'rutas', 'cliente'));
const cuentaRouter = require(path.join(__dirname, 'rutas', 'cuenta'));
const usuarioRouter = require(path.join(__dirname, 'rutas', 'usuario'));

// Servir frontend estático
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Rutas del backend
app.use('/cliente', clienteRouter);
app.use('/cuenta', cuentaRouter);
app.use('/usuario', usuarioRouter);

// Endpoint por defecto para abrir el frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'cliente.html'));
});

// Puerto dinámico asignado por Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
