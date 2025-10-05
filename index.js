const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./db');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Sirve archivos estáticos (solo index y assets públicos)
app.use(express.static('frontend'));

// Puerto dinámico de Render
const PORT = process.env.PORT || 3000;

// Verificar conexión a la base de datos
sequelize.authenticate()
  .then(() => console.log('✅ Conectado a la base de datos correctamente'))
  .catch(err => {
    console.error('❌ Error de conexión a la base de datos:', err);
    process.exit(1);
  });

// Configuración de Pool de pg
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

// ----------------- MIDDLEWARE PROTEGER RUTAS -----------------
// Siempre bloquea: nunca le damos el token a nadie
const protegerRuta = (req, res, next) => {
  // La condición nunca se cumple → nadie puede pasar
  return res.redirect('/'); 
};

// Ruta raíz: log_in.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'log_in.html'));
});

// Rutas HTML “protegidas” (nadie puede acceder escribiendo URL)
app.get('/menuadmin.html', protegerRuta, (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'menuadmin.html'));
});

app.get('/menuusuario.html', protegerRuta, (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'menuusuario.html'));
});

// Rutas CRUD existentes
const clienteRouter = require('./rutasCliente');
app.use('/cliente', clienteRouter);

const usuarioRouter = require('./rutasUsuario');
app.use('/usuario', usuarioRouter);

const cuentaRouter = require('./rutasCuenta');
app.use('/cuenta', cuentaRouter);

const cajeroRouter = require('./rutasCajero');
app.use('/cajero', cajeroRouter);

const transaccionRouter = require('./rutasTransaccion');
app.use('/transaccion', transaccionRouter);

// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
