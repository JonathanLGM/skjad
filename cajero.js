const defineCajero = (sequelize, DataTypes) => {
  const Cajero = sequelize.define('Cajero1', {
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
    },
    ubicacion: {
      type: DataTypes.GEOMETRY('POINT', 4326),
      allowNull: true
    }
  }, {
    tableName: 'cajero',
    timestamps: false,
    hooks: {
      beforeCreate: (cajero) => {
        if (cajero.latitud && cajero.longitud) {
          cajero.ubicacion = {
            type: 'Point',
            coordinates: [parseFloat(cajero.longitud), parseFloat(cajero.latitud)]
          };
        }
      },
      beforeUpdate: (cajero) => {
        if (cajero.latitud && cajero.longitud) {
          cajero.ubicacion = {
            type: 'Point',
            coordinates: [parseFloat(cajero.longitud), parseFloat(cajero.latitud)]
          };
        }
      }
    }
  });

  return Cajero;
};

module.exports = defineCajero;
