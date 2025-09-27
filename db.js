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

const Cliente1 = require('./cliente')(sequelize, DataTypes);
const Usuario1 = require('./usuario')(sequelize, DataTypes);
const Cuenta1 = require('./cuenta')(sequelize, DataTypes);
const Cajero1 = require('./cajero')(sequelize, DataTypes);
const Transaccion1 = require('./transaccion')(sequelize, DataTypes);

// exporta la instancia de sequelize y los modelos (todo en minúscula)
module.exports = {
  sequelize,
  Cliente1,
  Usuario1,
  Cliente1,
  Cajero1,
  Transaccion1
};
