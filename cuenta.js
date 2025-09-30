const defineCuenta = (sequelize, DataTypes) => {
  return sequelize.define('Cuenta1', {
    id_cuenta: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    saldo: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    fecha_apertura: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'cuenta',
    timestamps: true
  });
};

module.exports = defineCuenta;
