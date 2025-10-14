const defineCajero = (sequelize, DataTypes) => {
  return sequelize.define('Cajero1', {
    id_cajero: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitud: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: false
    },
    longitud: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_barrio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_tipo: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'cajero',
  });
};

module.exports = defineCajero;
