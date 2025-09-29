const { Transaccion1 } = require('./db'); // Importar modelo Transaccion1

// Crear transacción
const registrarTransaccion = async (req, res) => {
  try {
    const { tipo, fecha, monto, id_cuenta_origen, id_cuenta_destino, id_cajero } = req.body;

    // Validación opcional: evitar duplicados si es necesario (depende de tu lógica)
    // Por ejemplo, podrías validar transacciones duplicadas según tipo, fecha y cuenta origen

    const nuevaTransaccion = await Transaccion1.create(req.body);
    res.status(201).json({ mensaje: 'Transacción creada', resultado: nuevaTransaccion });
  } catch (err) {
    console.error('Error en registrarTransaccion:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Listar transacciones
const listarTransacciones = async (req, res) => {
  try {
    const transacciones = await Transaccion1.findAll();
    res.status(200).json({ mensaje: 'Transacciones listadas', resultado: transacciones });
  } catch (err) {
    console.error('Error en listarTransacciones:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Obtener transacción por ID
const obtenerTransaccionPorId = async (req, res) => {
  try {
    const transaccion = await Transaccion1.findByPk(req.params.id_transaccion);
    if (!transaccion) {
      return res.status(404).json({ mensaje: 'Transacción no encontrada', resultado: null });
    }
    res.status(200).json({ mensaje: 'Transacción encontrada', resultado: transaccion });
  } catch (err) {
    console.error('Error en obtenerTransaccionPorId:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

module.exports = {
  registrarTransaccion,
  listarTransacciones,
  obtenerTransaccionPorId
};
