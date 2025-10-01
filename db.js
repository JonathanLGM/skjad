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

Usuario1.belongsTo(Cliente1, { foreignKey: 'id_cliente' });
Cliente1.hasOne(Usuario1, { foreignKey: 'id_cliente' });

Cuenta1.belongsTo(Cliente1, { foreignKey: 'id_cliente' });
Cliente1.hasOne(Cuenta1, { foreignKey: 'id_cliente' });

// exporta la instancia de sequelize y los modelos (todo en minúscula)
module.exports = {
  sequelize,
  Cliente1,
  Usuario1,
  Cuenta1,
  Cajero1,
  Transaccion1
};
