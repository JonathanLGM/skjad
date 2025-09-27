// models/Transaccion.js
module.exports = (sequelize, DataTypes) => {
  const Transaccion = sequelize.define("Transaccion1", {
    id_transaccion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    monto: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    }
  }, {
    tableName: "Transaccion",
    timestamps: false
  });

  Transaccion.associate = models => {
    Transaccion.belongsTo(models.Cliente, { foreignKey: "id_cliente" });
    Transaccion.belongsTo(models.Cuenta, { foreignKey: "id_cuenta" });
    Transaccion.belongsTo(models.Cajero, { foreignKey: "id_cajero" });
    Transaccion.belongsTo(models.Tipo, { foreignKey: "id_tipo" });
  };

  return Transaccion;
};
