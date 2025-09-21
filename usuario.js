const { Sequelize, DataTypes } = require('sequelize');

const defineUsuario = (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    id_usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    fecha_final: {
      type: DataTypes.DATE,
      allowNull: true
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'ACTIVO'
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'usuario',
    timestamps: true
  });

  // Relación opcional con Cliente
  Usuario.associate = (models) => {
    Usuario.belongsTo(models.Cliente, { foreignKey: 'id_cliente', as: 'cliente' });
  };

  return Usuario;
};

module.exports = defineUsuario;
