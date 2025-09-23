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

// Importa y define el modelo 'Cliente'.
// La variable 'Cliente' (con 'C' mayúscula) es lo que se exportará.
const Cliente = require('./cliente')(sequelize, DataTypes);

// Sincroniza los modelos con la base de datos
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Modelos sincronizados con la base de datos');
  })
  .catch(err => {
    console.error('❌ Error al sincronizar modelos:', err);
    // En un entorno de producción, es buena práctica salir si la conexión falla.
    // process.exit(1);
  });

// Exporta la instancia de Sequelize y el modelo 'Cliente'.
module.exports = {
  sequelize,
  Cliente1
};