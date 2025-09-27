const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Sirve archivos estáticos desde la carpeta 'frontend'
app.use(express.static('frontend'));

// Puerto dinámico de Render
const PORT = process.env.PORT || 3000;

// Verificar conexión a la base de datos a través de Sequelize
sequelize.authenticate()
  .then(() => console.log('✅ Conectado a la base de datos (Sequelize) correctamente en Render'))
  .catch(err => {
    console.error('❌ Error de conexión a la base de datos (Sequelize):', err);
    process.exit(1);
  });

// --- Configuración de Pool de pg ---
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get('/barrios', async (req, res) => {
  try {
    const result = await pool.query('SELECT nombre FROM barrio LIMIT 10;');
    res.json(result.rows);
  } catch (err) {
    console.error('Error en la consulta:', err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
});

// Ruta raíz para cargar cliente.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/log_in.css');
});

// Rutas CRUD de Cliente
const clienteRouter = require('./rutasCliente');
app.use('/cliente', clienteRouter);

// 🚀 Rutas CRUD de Usuario (agregado)
const usuarioRouter = require('./rutasUsuario');
app.use('/usuario', usuarioRouter);

// 🚀 Rutas CRUD de Cuenta (nuevo)
const cuentaRouter = require('./rutasCuenta');
app.use('/cuenta', cuentaRouter);

// 🚀 Rutas CRUD de Cajero (nuevo)
const cajeroRouter = require('./rutasCajero');
app.use('/cajero', cajeroRouter);

// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
