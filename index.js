const express = require('express');
const { Client } = require('pg');
const cors = require('cors'); // 👈 importar cors

const app = express();

// 👇 permitir todas las peticiones (desde Brave, Chrome, etc.)
app.use(cors({
  origin: "*",  // 👈 acepta cualquier origen (file:// también)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// Configuración de Postgres
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'BancaTerritorialDB',
  password: 'postgres',
  port: 5432,
  client_encoding: 'UTF8'
});

// Conexión
client.connect()
  .then(() => console.log('✅ Conectado a Postgres correctamente (UTF-8)'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Endpoint
app.get('/barrios', async (req, res) => {
  try {
    const result = await client.query('SELECT nombre FROM barrio LIMIT 10');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la consulta');
  }
});

app.listen(3000, () => {
  console.log('🚀 Servidor en http://localhost:3000');
});
