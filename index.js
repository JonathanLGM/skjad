const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./db');
const { Cliente } = require('./db'); // Asegúrate de que db.js exporte Cliente

const app = express();
app.use(cors());
app.use(express.json());

// --- CAMBIO CLAVE AQUÍ ---
// Sirve archivos estáticos desde la carpeta 'frontend'
// Esto significa que si pides `/cliente.html`, Express lo buscará en `./frontend/cliente.html`
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

// --- Mantenemos el Pool de pg si lo necesitas para /barrios, de lo contrario, puedes quitarlo ---
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

// --- CAMBIO CLAVE AQUÍ ---
// Ruta raíz para cargar cliente.html
// Ahora que 'frontend' se sirve estáticamente, simplemente podemos referirnos a 'cliente.html'
// si la ruta base es `/` y el archivo está en la carpeta servida.
// Sin embargo, para ser explícitos y evitar ambigüedades, es mejor usar la ruta completa.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/cliente.html'); // Ruta explícita dentro del proyecto
});


// Rutas CRUD de Cliente
// Estas rutas asumen que clienteRouter.js está en la raíz, lo cual es correcto según tu imagen.
const clienteRouter = require('./rutasCliente');
app.use('/cliente', clienteRouter);

// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});