const { Sequelize, DataTypes } = require('sequelize');

const defineCliente = (sequelize) => {
  const Cliente = sequelize.define('Cliente', {
    id_cliente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    documento: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    id_barrio: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'cliente',
    timestamps: true
  });

  // Relaciones opcionales
  Cliente.associate = (models) => {
    Cliente.belongsTo(models.Barrio, { foreignKey: 'id_barrio', as: 'barrio' });
    Cliente.hasMany(models.Cuenta, { foreignKey: 'id_cliente', as: 'cuentas' });
  };

  return Cliente;
};

module.exports = defineCliente;
