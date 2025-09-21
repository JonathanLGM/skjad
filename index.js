const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Servir frontend desde la carpeta "frontend"
app.use(express.static('frontend'));

// Puerto dinámico de Render
const PORT = process.env.PORT || 3000;

// Configuración de PostgreSQL con SSL (Render)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Verificar conexión a la base de datos
pool.connect()
  .then(() => console.log('✅ Conectado a Postgres correctamente en Render'))
  .catch(err => {
    console.error('❌ Error de conexión:', err);
    process.exit(1); // Detener el servidor si no hay conexión
  });

// Endpoint de prueba para barrios
app.get('/barrios', async (req, res) => {
  try {
    const result = await pool.query('SELECT nombre FROM barrio LIMIT 10;');
    res.json(result.rows);
  } catch (err) {
    console.error('Error en la consulta:', err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
});

// Ruta raíz para cargar directamente cliente.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/cliente.html');
});

// Rutas CRUD de Cliente
try {
  const clienteRouter = require('./rutasCliente'); // Asegúrate de que rutasCliente.js esté en la raíz
  app.use('/cliente', clienteRouter);
} catch (err) {
  console.warn('⚠️ No se cargó rutasCliente.js, revisa el archivo:', err.message);
}

// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
