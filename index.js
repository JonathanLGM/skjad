const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Crear cliente con la URL de conexión de Render
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // obligatorio en Render
});

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // necesario en Render
});


// Conexión
client.connect()
  .then(() => console.log('✅ Conectado a Postgres correctamente en Render'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Endpoint para traer barrios
app.get('/barrios', async (req, res) => {
  try {
    const result = await client.query('SELECT nombre FROM barrio LIMIT 10;');
    res.json(result.rows);
  } catch (err) {
    console.error('Error en la consulta:', err);
    res.status(500).send('Error en la consulta');
  }
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
