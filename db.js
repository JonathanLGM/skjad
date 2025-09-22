const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Configuración de Sequelize para PostgreSQL en Render
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Importante para Render
    }
  },
  logging: false // Desactiva el log de SQL por defecto, puedes activarlo para depurar
});

// Importar y definir el modelo Cliente
const defineCliente = require('./cliente'); // Asume que cliente.js está en la misma raíz
const Cliente = defineCliente(sequelize, DataTypes);

// Definir el modelo Barrio (si lo necesitas para relaciones o validaciones futuras)
// Aunque en tu modelo Cliente usas id_barrio, no defines el modelo Barrio aquí.
// Por ahora, solo nos enfocamos en Cliente.
// Si tuvieras un modelo Barrio, se definiría y se asociaría aquí.

// Sincronizar modelos (crea las tablas si no existen)
// En producción, es mejor usar migraciones, pero para desarrollo rápido, esto funciona.
sequelize.sync()
  .then(() => {
    console.log('✅ Modelos sincronizados con la base de datos');
  })
  .catch(err => {
    console.error('❌ Error al sincronizar modelos:', err);
  });

module.exports = {
  sequelize,
  Cliente
};