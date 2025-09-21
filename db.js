const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: { ssl: { rejectUnauthorized: false } },
});

const Cliente = require('./cliente')(sequelize, DataTypes);
const Cuenta  = require('./cuenta')(sequelize, DataTypes);
const Usuario = require('./usuario')(sequelize, DataTypes);

module.exports = {
  sequelize,
  Cliente,
  Cuenta,
  Usuario
};
