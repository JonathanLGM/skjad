const defineTransaccion = (sequelize, DataTypes) => {
  return sequelize.define('Transaccion1', { // mayúscula inicial como en Cuenta1
    id_transaccion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tipo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY, // como fecha_apertura en cuenta.js
      allowNull: false
    },
    monto: {
      type: DataTypes.DECIMAL(12, 2), // similar a saldo de cuenta
      allowNull: false
    },
   id_cuenta_origen: {
    type: DataTypes.STRING,
    references: {
    model: 'Cuenta',
    key: 'id_cuenta'
      }
    },
    id_cuenta_destino: {
      type: DataTypes.STRING,
      references: {
      model: 'Cuenta',
      key: 'id_cuenta'
      }
    },
    id_cajero: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'transaccion', // nombre de la tabla en la base
    timestamps: true // igual que en cuenta.js
  });
};

module.exports = defineTransaccion;