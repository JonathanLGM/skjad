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

// --- Asegúrate de que estas rutas de require son correctas según tu estructura ---
// Si cliente.js está en la raíz
const defineCliente = require('./cliente');
const Cliente = defineCliente(sequelize, DataTypes);

// Aquí definirías las asociaciones si las hay
// Ejemplo: Cliente.hasMany(Cuenta, { foreignKey: 'id_cliente' });
// Cuenta.belongsTo(Cliente, { foreignKey: 'id_cliente' });

sequelize.sync({ alter: true }) // 'alter: true' intentará actualizar las tablas sin borrarlas
  .then(() => {
    console.log('✅ Modelos sincronizados con la base de datos');
  })
  .catch(err => {
    console.error('❌ Error al sincronizar modelos:', err);
    // Considera si quieres que la aplicación se cierre en un entorno de producción si la sincronización falla
    // process.exit(1);
  });

module.exports = {
  sequelize,
  Cliente,
};