const { transaccion1 } = require('./db'); // Importar modelo transaccion1

// Crear transaccion
const registrarTransaccion = async (req, res) => {
  try {
    const nuevaTransaccion = await transaccion1.create(req.body);
    res.status(201).json({ mensaje: 'Transaccion creada', resultado: nuevaTransaccion });
  } catch (err) {
    console.error('Error en registrarTransaccion:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Listar transacciones
const listarTransacciones = async (req, res) => {
  try {
    const transacciones = await transaccion1.findAll();
    res.status(200).json({ mensaje: 'Transacciones listadas', resultado: transacciones });
  } catch (err) {
    console.error('Error en listarTransacciones:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Obtener transaccion por ID
const obtenerTransaccionPorId = async (req, res) => {
  try {
    console.log('Params recibidos en obtenerTransaccionPorId:', req.params);

    const transaccion = await transaccion1.findByPk(req.params.id_transaccion);
    if (!transaccion) {
      return res.status(404).json({ mensaje: 'Transaccion no encontrada', resultado: null });
    }

    res.status(200).json({ mensaje: 'Transaccion encontrada', resultado: transaccion });
  } catch (err) {
    console.error('Error en obtenerTransaccionPorId:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Actualizar transaccion
const actualizarTransaccion = async (req, res) => {
  try {
    const transaccion = await transaccion1.findByPk(req.params.id_transaccion);
    if (!transaccion) return res.status(404).json({ mensaje: 'Transaccion no encontrada', resultado: null });

    await transaccion.update(req.body);
    res.status(200).json({ mensaje: 'Transaccion actualizada', resultado: transaccion });
  } catch (err) {
    console.error('Error en actualizarTransaccion:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Eliminar transaccion
const borrarTransaccion = async (req, res) => {
  try {
    const transaccion = await transaccion1.findByPk(req.params.id_transaccion);
    if (!transaccion) return res.status(404).json({ mensaje: 'Transaccion no encontrada', resultado: null });

    await transaccion.destroy();
    res.status(200).json({ mensaje: 'Transaccion eliminada', resultado: transaccion });
  } catch (err) {
    console.error('Error en borrarTransaccion:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

module.exports = {
  registrarTransaccion,
  listarTransacciones,
  obtenerTransaccionPorId,
  actualizarTransaccion,
  borrarTransaccion
};
