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

// Verificar conexión
pool.connect()
  .then(() => console.log('✅ Conectado a Postgres correctamente en Render'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Endpoint de prueba
app.get('/barrios', async (req, res) => {
  try {
    const result = await pool.query('SELECT nombre FROM barrio LIMIT 10;');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la consulta');
  }
});

// Ruta raíz para frontend
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/cliente.html');
});

// Importar rutas
const clienteRouter = require('./rutasCliente');
app.use('/cliente', clienteRouter);

// Agrega aquí las demás rutas cuando las tengas
// const cuentaRouter = require('./cuenta');
// const usuarioRouter = require('./usuario');
// app.use('/cuenta', cuentaRouter);
// app.use('/usuario', usuarioRouter);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
