const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

// Importamos el archivo 'Cliente.js' y la función 'defineCliente'.
const defineCliente = require('./Cliente');
const Cliente = defineCliente(sequelize, DataTypes);

// Sincroniza los modelos con la base de datos
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Modelos sincronizados con la base de datos');
  })
  .catch(err => {
    console.error('❌ Error al sincronizar modelos:', err);
  });

// Exporta la instancia de Sequelize y el modelo 'Cliente' (con C mayúscula).
module.exports = {
  sequelize,
  Cliente,
};
