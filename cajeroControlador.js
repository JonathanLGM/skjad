const Joi = require('joi');
const { Cajero, Barrio, Tipo } = require('../baseDatos/index');

// ✅ Validación con Joi
const validadorCajero = Joi.object({
  direccion: Joi.string().min(5).max(100).required(),
  latitud: Joi.number().precision(6).required(),
  longitud: Joi.number().precision(6).required(),
  estado: Joi.string().valid('activo', 'inactivo', 'mantenimiento').required(),
  id_barrio: Joi.number().integer().required(),
  id_tipo: Joi.number().integer().required()
});

// ✅ Crear Cajero
const registrarCajero = async (req, res) => {
  try {
    const { error } = validadorCajero.validate(req.body, { abortEarly: false });
    if (error) {
      const errores = error.details.map(det => det.message).join('|');
      return res.status(400).json({ mensaje: 'Errores en validación', errores });
    }

    const { id_barrio, id_tipo } = req.body;

    // Validar que el barrio exista
    const barrio = await Barrio.findByPk(id_barrio);
    if (!barrio) return res.status(404).json({ mensaje: 'Barrio no encontrado' });

    // Validar que el tipo exista
    const tipo = await Tipo.findByPk(id_tipo);
    if (!tipo) return res.status(404).json({ mensaje: 'Tipo no encontrado' });

    const nuevoCajero = await Cajero.create(req.body);
    res.status(201).json({ mensaje: 'Cajero creado', resultado: nuevoCajero });

  } catch (err) {
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// ✅ Listar Cajeros
const listarCajeros = async (req, res) => {
  try {
    const cajeros = await Cajero.findAll({
      include: [Barrio, Tipo]
    });
    res.status(200).json({ mensaje: 'Cajeros listados', resultado: cajeros });
  } catch (err) {
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// ✅ Actualizar Cajero
const actualizarCajero = async (req, res) => {
  try {
    const { id_cajero } = req.params;
    const cajero = await Cajero.findByPk(id_cajero);

    if (!cajero) return res.status(404).json({ mensaje: 'Cajero no encontrado' });

    await cajero.update(req.body);
    res.status(200).json({ mensaje: 'Cajero actualizado', resultado: cajero });

  } catch (err) {
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// ✅ Eliminar Cajero
const borrarCajero = async (req, res) => {
  try {
    const { id_cajero } = req.params;
    const cajero = await Cajero.findByPk(id_cajero);

    if (!cajero) return res.status(404).json({ mensaje: 'Cajero no encontrado' });

    await cajero.destroy();
    res.status(200).json({ mensaje: 'Cajero eliminado', resultado: cajero });

  } catch (err) {
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

module.exports = {
  registrarCajero,
  listarCajeros,
  actualizarCajero,
  borrarCajero
};
