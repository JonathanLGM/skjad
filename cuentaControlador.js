const { Cuenta1 } = require('./db'); // Importar modelo Cuenta1

// Crear cuenta
const registrarCuenta = async (req, res) => {
  try {

    // Generar número de cuenta aleatorio de 10 dígitos
    const numeroCuenta = Math.floor(1000000000 + Math.random() * 9000000000);
     id_cuenta: numeroCuenta
     
    const { id_cuenta } = req.body;

    // Validar duplicados
    if (await Cuenta1.findOne({ where: { id_cuenta } })) {
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

// 🔹 Nuevo: Obtener cuenta usando id_cliente
const obtenerCuentaPorCliente = async (req, res) => {
  try {
    const { id_cliente } = req.params;

    // Primero buscamos la cuenta con ese id_cliente
    const cuenta = await Cuenta1.findOne({ where: { id_cliente } });

    if (!cuenta) {
      return res.status(404).json({ mensaje: 'Cuenta no encontrada para este cliente', resultado: null });
    }

    // Reutilizamos la función de buscar por ID
    req.params.id_cuenta = cuenta.id_cuenta;
    return obtenerCuentaPorId(req, res);

  } catch (err) {
    console.error('Error en obtenerCuentaPorCliente:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

module.exports = {
  registrarCuenta,
  listarCuentas,
  obtenerCuentaPorId,
  actualizarCuenta,
  borrarCuenta,
  obtenerCuentaPorCliente
};
