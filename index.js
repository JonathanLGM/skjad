const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./db');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Puerto dinámico de Render
const PORT = process.env.PORT || 3000;

// Verificar conexión con Sequelize
sequelize.authenticate()
  .then(() => console.log('✅ Conectado a la base de datos (Sequelize)'))
  .catch(err => {
    console.error('❌ Error de conexión a la base de datos:', err);
    process.exit(1);
  });

// --- Pool de pg ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Ejemplo consulta directa
app.get('/barrios', async (req, res) => {
  try {
    const result = await pool.query('SELECT nombre FROM barrio LIMIT 10;');
    res.json(result.rows);
  } catch (err) {
    console.error('Error en la consulta:', err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
});

// --- Rutas API primero ---
const clienteRouter = require('./rutasCliente');
app.use('/cliente', clienteRouter);

const usuarioRouter = require('./rutasUsuario');
app.use('/usuario', usuarioRouter);

const cuentaRouter = require('./rutasCuenta');
app.use('/cuenta', cuentaRouter);

// --- Archivos estáticos ---
app.use(express.static('frontend'));

// Ruta raíz opcional
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/cliente.html');
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
