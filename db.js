const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false // necesario en Render
    }
  },
  logging: false // opcional, para no mostrar logs SQL
});

module.exports = sequelize;
