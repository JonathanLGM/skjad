const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Servir frontend
app.use(express.static('frontend'));

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
  res.sendFile(__dirname + '/../frontend/cliente.html');
});

// Importar rutas usando 'backend/...'
const clienteRouter = require('backend/rutas/rutasCliente');
const cuentaRouter  = require('backend/rutas/cuenta');
const usuarioRouter = require('backend/rutas/usuario');

// Usar rutas
app.use('/cliente', clienteRouter);
app.use('/cuenta', cuentaRouter);
app.use('/usuario', usuarioRouter);

// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
