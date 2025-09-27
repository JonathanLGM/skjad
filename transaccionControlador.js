const { transaccion1 } = require('./db'); // importar modelo transaccion1

// crear transaccion
const registrarTransaccion = async (req, res) => {
  try {
    const nuevaTransaccion = await transaccion1.create(req.body);
    res.status(201).json({ mensaje: 'transaccion creada', resultado: nuevaTransaccion });
  } catch (err) {
    console.error('error en registrarTransaccion:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// listar transacciones
const listarTransacciones = async (req, res) => {
  try {
    const transacciones = await transaccion1.findAll();
    res.status(200).json({ mensaje: 'transacciones listadas', resultado: transacciones });
  } catch (err) {
    console.error('error en listarTransacciones:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// obtener transaccion por id
const obtenerTransaccionPorId = async (req, res) => {
  try {
    console.log('params recibidos en obtenerTransaccionPorId:', req.params);

    const transaccion = await transaccion1.findByPk(req.params.id_transaccion);
    if (!transaccion) {
      return res.status(404).json({ mensaje: 'transaccion no encontrada', resultado: null });
    }

    res.status(200).json({ mensaje: 'transaccion encontrada', resultado: transaccion });
  } catch (err) {
    console.error('error en obtenerTransaccionPorId:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// actualizar transaccion
const actualizarTransaccion = async (req, res) => {
  try {
    const transaccion = await transaccion1.findByPk(req.params.id_transaccion);
    if (!transaccion) return res.status(404).json({ mensaje: 'transaccion no encontrada', resultado: null });

    await transaccion.update(req.body);
    res.status(200).json({ mensaje: 'transaccion actualizada', resultado: transaccion });
  } catch (err) {
    console.error('error en actualizarTransaccion:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// eliminar transaccion
const borrarTransaccion = async (req, res) => {
  try {
    const transaccion = await transaccion1.findByPk(req.params.id_transaccion);
    if (!transaccion) return res.status(404).json({ mensaje: 'transaccion no encontrada', resultado: null });

    await transaccion.destroy();
    res.status(200).json({ mensaje: 'transaccion eliminada', resultado: transaccion });
  } catch (err) {
    console.error('error en borrarTransaccion:', err);
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
