const { Cajero1 } = require('./db'); // Importar modelo Cajero1

// Crear cajero
const registrarCajero = async (req, res) => {
  try {
    const { latitud, longitud } = req.body;

    // Validar duplicados de latitud y longitud
    if (await Cajero1.findOne({ where: { latitud } })) {
      return res.status(400).json({ mensaje: 'La latitud ya está registrada' });
    }

    if (await Cajero1.findOne({ where: { longitud } })) {
      return res.status(400).json({ mensaje: 'La longitud ya está registrada' });
    }

    const nuevoCajero = await Cajero1.create(req.body);
    res.status(201).json({ mensaje: 'Cajero creado', resultado: nuevoCajero });
  } catch (err) {
    console.error('Error en registrarCajero:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Listar cajeros
const listarCajeros = async (req, res) => {
  try {
    const cajeros = await Cajero1.findAll();
    res.status(200).json({ mensaje: 'Cajeros listados', resultado: cajeros });
  } catch (err) {
    console.error('Error en listarCajeros:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Obtener cajero por ID
const obtenerCajeroPorId = async (req, res) => {
  try {
    console.log('Params recibidos en obtenerCajeroPorId:', req.params);

    const cajero = await Cajero1.findByPk(req.params.id_cajero);
    if (!cajero) {
      return res.status(404).json({ mensaje: 'Cajero no encontrado', resultado: null });
    }

    res.status(200).json({ mensaje: 'Cajero encontrado', resultado: cajero });
  } catch (err) {
    console.error('Error en obtenerCajeroPorId:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Actualizar cajero
const actualizarCajero = async (req, res) => {
  try {
    const cajero = await Cajero1.findByPk(req.params.id_cajero);
    if (!cajero) return res.status(404).json({ mensaje: 'Cajero no encontrado', resultado: null });

    await cajero.update(req.body);
    res.status(200).json({ mensaje: 'Cajero actualizado', resultado: cajero });
  } catch (err) {
    console.error('Error en actualizarCajero:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Eliminar cajero
const borrarCajero = async (req, res) => {
  try {
    const cajero = await Cajero1.findByPk(req.params.id_cajero);
    if (!cajero) return res.status(404).json({ mensaje: 'Cajero no encontrado', resultado: null });

    await cajero.destroy();
    res.status(200).json({ mensaje: 'Cajero eliminado', resultado: cajero });
  } catch (err) {
    console.error('Error en borrarCajero:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

module.exports = {
  registrarCajero,
  listarCajeros,
  obtenerCajeroPorId,
  actualizarCajero,
  borrarCajero
};