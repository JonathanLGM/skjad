const { Sequelize, DataTypes } = require('sequelize');

const defineCuenta = (sequelize) => {
  const Cuenta = sequelize.define('Cuenta', {
    id_cuenta: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    numero_cuenta: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'ACTIVA'
    },
    saldo: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    fecha_apertura: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'cuenta',
    timestamps: true
  });

  // Asociación opcional con Cliente
  Cuenta.associate = (models) => {
    Cuenta.belongsTo(models.Cliente, { foreignKey: 'id_cliente', as: 'cliente' });
  };

  return Cuenta;
};

module.exports = defineCuenta;
