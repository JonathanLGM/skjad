const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// Servir archivos estáticos desde la carpeta "frontend"
app.use(express.static('frontend'));

// Puerto dinámico de Render
const PORT = process.env.PORT || 3000;

// Pool de PostgreSQL con SSL (necesario en Render)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Verificar conexión al iniciar la app
pool.connect()
  .then(() => console.log('✅ Conectado a Postgres correctamente en Render'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Endpoint para traer barrios
app.get('/barrios', async (req, res) => {
  try {
    const result = await pool.query('SELECT nombre FROM barrio LIMIT 10;');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error en la consulta:', err);
    res.status(500).send('Error en la consulta');
  }
});

// Ruta raíz para servir el HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
