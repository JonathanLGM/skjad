const { Cuenta1 } = require('./db'); // Importar modelo Cuenta1

// Crear cuenta
const registrarCuenta = async (req, res) => {
  try {
    const { numero_cuenta } = req.body;

    // Validar duplicados
    if (await Cuenta1.findOne({ where: { numero_cuenta } })) {
      return res.status(400).json({ mensaje: 'El número de cuenta ya está registrado' });
    }

    const nuevaCuenta = await Cuenta1.create(req.body);
    res.status(201).json({ mensaje: 'Cuenta creada', resultado: nuevaCuenta });
  } catch (err) {
    console.error('Error en registrarCuenta:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Listar cuentas
const listarCuentas = async (req, res) => {
  try {
    const cuentas = await Cuenta1.findAll();
    res.status(200).json({ mensaje: 'Cuentas listadas', resultado: cuentas });
  } catch (err) {
    console.error('Error en listarCuentas:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Obtener cuenta por ID
const obtenerCuentaPorId = async (req, res) => {
  try {
    const cuenta = await Cuenta1.findByPk(req.params.id_cuenta);
    if (!cuenta) return res.status(404).json({ mensaje: 'Cuenta no encontrada', resultado: null });
    res.status(200).json({ mensaje: 'Cuenta encontrada', resultado: cuenta });
  } catch (err) {
    console.error('Error en obtenerCuentaPorId:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Actualizar cuenta
const actualizarCuenta = async (req, res) => {
  try {
    const cuenta = await Cuenta1.findByPk(req.params.id_cuenta);
    if (!cuenta) return res.status(404).json({ mensaje: 'Cuenta no encontrada', resultado: null });

    await cuenta.update(req.body);
    res.status(200).json({ mensaje: 'Cuenta actualizada', resultado: cuenta });
  } catch (err) {
    console.error('Error en actualizarCuenta:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Eliminar cuenta
const borrarCuenta = async (req, res) => {
  try {
    const cuenta = await Cuenta1.findByPk(req.params.id_cuenta);
    if (!cuenta) return res.status(404).json({ mensaje: 'Cuenta no encontrada', resultado: null });

    await cuenta.destroy();
    res.status(200).json({ mensaje: 'Cuenta eliminada', resultado: cuenta });
  } catch (err) {
    console.error('Error en borrarCuenta:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

const { Cuenta1 } = require('./db');

// Controlador para listar cuentas de un cliente
const listarPorCliente = async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const cuentas = await Cuenta1.findAll({ where: { id_cliente } });

    if (cuentas.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron cuentas para este cliente" });
    }

    res.json({ mensaje: "Cuentas encontradas", resultado: cuentas });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

module.exports = {
  listarPorCliente
};



module.exports = {
  registrarCuenta,
  listarCuentas,
  obtenerCuentaPorId,
  actualizarCuenta,
  borrarCuenta,
  listarPorCliente
};
