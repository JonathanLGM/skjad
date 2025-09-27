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

// importa y define el modelo 'cliente'
const cliente1 = require('./cliente')(sequelize, DataTypes);

// importa y define el modelo 'usuario'
const usuario1 = require('./usuario')(sequelize, DataTypes);

// importa y define el modelo 'cuenta'
const cuenta1 = require('./cuenta')(sequelize, DataTypes);

// importa y define el modelo 'cajero'
const cajero1 = require('./cajero')(sequelize, DataTypes);

// importa y define el modelo 'transaccion'
const transaccion1 = require('./transaccion')(sequelize, DataTypes);

// sincroniza los modelos con la base de datos
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ modelos sincronizados con la base de datos');
  })
  .catch(err => {
    console.error('❌ error al sincronizar modelos:', err);
  });

// exporta la instancia de sequelize y los modelos (todo en minúscula)
module.exports = {
  sequelize,
  cliente1,
  usuario1,
  cuenta1,
  cajero1,
  transaccion1
};
