const Joi = require('joi');
const { Cuenta, Cliente } = require('../baseDatos/index');

// ✅ Esquema de validación con Joi
const validadorCuenta = Joi.object({
  numero_cuenta: Joi.string().min(5).max(20).required(),
  estado: Joi.string().valid('activa', 'inactiva', 'bloqueada').required(),
  saldo: Joi.number().precision(2).min(0).required(),
  fecha_apertura: Joi.date().required(),
  id_cliente: Joi.number().integer().required()
});

// ✅ Crear cuenta
const registrarCuenta = async (req, res) => {
  try {
    const { error } = validadorCuenta.validate(req.body, { abortEarly: false });
    if (error) {
      const errores = error.details.map(det => det.message).join('|');
      return res.status(400).json({ mensaje: 'Errores en validación', errores });
    }

    const { numero_cuenta, id_cliente } = req.body;

    // Verificar duplicado
    const existeCuenta = await Cuenta.findOne({ where: { numero_cuenta } });
    if (existeCuenta) return res.status(400).json({ mensaje: 'El número de cuenta ya está registrado' });

    // Verificar que el cliente exista
    const cliente = await Cliente.findByPk(id_cliente);
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });

    const nuevaCuenta = await Cuenta.create(req.body);
    res.status(201).json({ mensaje: 'Cuenta creada', resultado: nuevaCuenta });

  } catch (err) {
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// ✅ Listar cuentas
const listarCuentas = async (req, res) => {
  try {
    const cuentas = await Cuenta.findAll({ include: Cliente });
    res.status(200).json({ mensaje: 'Cuentas listadas', resultado: cuentas });
  } catch (err) {
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// ✅ Actualizar cuenta
const actualizarCuenta = async (req, res) => {
  try {
    const { id_cuenta } = req.params;
    const cuenta = await Cuenta.findByPk(id_cuenta);

    if (!cuenta) return res.status(404).json({ mensaje: 'Cuenta no encontrada', resultado: null });

    await cuenta.update(req.body);
    res.status(200).json({ mensaje: 'Cuenta actualizada', resultado: cuenta });

  } catch (err) {
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// ✅ Eliminar cuenta
const borrarCuenta = async (req, res) => {
  try {
    const { id_cuenta } = req.params;
    const cuenta = await Cuenta.findByPk(id_cuenta);

    if (!cuenta) return res.status(404).json({ mensaje: 'Cuenta no encontrada', resultado: null });

    await cuenta.destroy();
    res.status(200).json({ mensaje: 'Cuenta eliminada', resultado: cuenta });

  } catch (err) {
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

module.exports = {
  registrarCuenta,
  listarCuentas,
  actualizarCuenta,
  borrarCuenta
};
