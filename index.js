const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Servir frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Puerto dinámico de Render
const PORT = process.env.PORT || 3000;

// Pool de PostgreSQL con SSL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Verificar conexión al iniciar la app
pool.connect()
  .then(() => console.log('✅ Conectado a Postgres correctamente en Render'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Endpoint de prueba para barrios
app.get('/barrios', async (req, res) => {
  try {
    const result = await pool.query('SELECT nombre FROM barrio LIMIT 10;');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error en la consulta:', err);
    res.status(500).send('Error en la consulta');
  }
});

// Ruta raíz para abrir el HTML del frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'cliente.html'));
});

// Importar rutas del backend usando nombres reales
const clienteRouter = require(path.join(__dirname, 'rutas', 'rutasCliente')); // archivo: backend/rutas/rutasCliente.js
const cuentaRouter = require(path.join(__dirname, 'rutas', 'cuenta'));        // archivo: backend/rutas/cuenta.js
const usuarioRouter = require(path.join(__dirname, 'rutas', 'usuario'));      // archivo: backend/rutas/usuario.js

// Usar rutas
app.use('/cliente', clienteRouter);
app.use('/cuenta', cuentaRouter);
app.use('/usuario', usuarioRouter);

// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
