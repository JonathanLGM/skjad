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

// Importa y define el modelo 'Cliente'
const Cliente1 = require('./cliente')(sequelize, DataTypes);

// Importa y define el modelo 'Usuario'
const Usuario1 = require('./usuario')(sequelize, DataTypes);

// Importa y define el modelo 'Cuenta'
const Cuenta1 = require('./cuenta')(sequelize, DataTypes);

// Importa y define el modelo 'Cajero'
const Cajero1 = require('./cajero')(sequelize, DataTypes);

// Importa y define el modelo 'Transaccion'
const Transaccion1 = require('./transaccion')(sequelize, DataTypes);

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

// Exporta la instancia de Sequelize y los modelos
module.exports = {
  sequelize,
  Cliente1,
  Usuario1,
  Cuenta1,
  Cajero1,
  Transaccion1
};
