// transaccion.js
const defineTransaccion = (sequelize, DataTypes) => {
  return sequelize.define('Transaccion1', {
    id_transaccion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    monto: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    id_cuenta_origen: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_cuenta_destino: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_cajero: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'transaccion',
    timestamps: false
  });
};

module.exports = defineTransaccion;
