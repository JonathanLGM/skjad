const defineUsuario = (sequelize, DataTypes) => {
  return sequelize.define('Usuario1', {
    id_usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'username'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
      fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fecha_final: {
      type: DataTypes.DATE,
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'usuario',
    timestamps: true
  });
};

module.exports = defineUsuario;
