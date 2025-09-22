// Cliente.js
const defineCliente = (sequelize, DataTypes) => {
  return sequelize.define('Cliente', {
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
    timestamps: true // Esto creará createdAt y updatedAt
  });
};

module.exports = defineCliente;