const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./db'); // Importa la instancia de sequelize y modelos
const { Cliente } = require('./db'); // Importa el modelo Cliente

const app = express();
app.use(cors());
app.use(express.json());

// --- ACLARACIÓN IMPORTANTE PARA SERVIR FRONTEND ---
// Si tu cliente.html está en la RAÍZ del repositorio, usa esto:
app.use(express.static(__dirname)); // Sirve archivos estáticos desde la raíz
// Si tu cliente.html está en una carpeta 'frontend' en la raíz, usa esto:
// app.use(express.static('frontend')); // Sirve archivos estáticos desde la carpeta 'frontend'

// **Por tu descripción, parece que quieres todo en la raíz, así que recomiendo la primera opción.**
// Sin embargo, tu HTML hace referencia a un "frontend/cliente.html" en el comentario.
// Voy a asumir que cliente.html está en la raíz y la carpeta 'frontend' no existe o no se usa para el HTML.
// Si realmente tienes una carpeta 'frontend' con cliente.html dentro, ajusta la línea anterior.

// Puerto dinámico de Render
const PORT = process.env.PORT || 3000;

// Verificar conexión a la base de datos a través de Sequelize
sequelize.authenticate()
  .then(() => console.log('✅ Conectado a la base de datos (Sequelize) correctamente en Render'))
  .catch(err => {
    console.error('❌ Error de conexión a la base de datos (Sequelize):', err);
    process.exit(1);
  });

// Endpoint de prueba para barrios usando Sequelize si tuvieras un modelo Barrio
// Si no tienes un modelo Barrio definido con Sequelize, seguirás usando el pool de pg.
// Para mantener tu endpoint existente, lo dejo como está, pero ten en cuenta la duplicidad
// de conexión si usas pg y sequelize para la misma DB.
// Si solo necesitas el nombre, puedes seguir usando pg.
const { Pool } = require('pg'); // Mantén esto si sigues usando pg directamente para /barrios
const pool = new Pool({ // Y esto
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

// Ruta raíz para cargar directamente cliente.html
app.get('/', (req, res) => {
  // Asegúrate de que esta ruta apunte al archivo correcto.
  // Si cliente.html está en la raíz:
  res.sendFile(__dirname + '/cliente.html');
  // Si cliente.html está en una carpeta 'frontend' y estás sirviendo 'frontend':
  // res.sendFile(__dirname + '/frontend/cliente.html'); // Esta es tu línea original
});


// Rutas CRUD de Cliente
// Asegúrate de que rutasCliente.js esté en la misma carpeta raíz
const clienteRouter = require('./rutasCliente');
app.use('/cliente', clienteRouter);


// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});