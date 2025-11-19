const { Transaccion1, Cuenta1, sequelize } = require('./db'); // Importamos también Cuenta1 y sequelize

// Crear transacción
const registrarTransaccion = async (req, res) => {
  const t = await sequelize.transaction(); // Iniciamos transacción de Sequelize
  try {
    const {fecha, monto, id_cuenta_origen, id_cuenta_destino, id_cajero } = req.body;

    // 1. Validar monto negativo
    if (monto <= 0) {
      await t.rollback();
      return res.status(400).json({ mensaje: 'El monto debe ser mayor a 0', resultado: null });
    }

    // 2. Buscar cuenta origen
    const cuentaOrigen = await Cuenta1.findByPk(id_cuenta_origen, { transaction: t });
    if (!cuentaOrigen) {
      await t.rollback();
      return res.status(404).json({ mensaje: 'Cuenta origen no encontrada', resultado: null });
    }

    // 3. Buscar cuenta destino
    const cuentaDestino = await Cuenta1.findByPk(id_cuenta_destino, { transaction: t });
    if (!cuentaDestino) {
      await t.rollback();
      return res.status(404).json({ mensaje: 'Cuenta destino no encontrada', resultado: null });
    }

    // 4. Validar saldo suficiente en la cuenta origen
    if (cuentaOrigen.saldo < monto) {
      await t.rollback();
      return res.status(400).json({ mensaje: 'Saldo insuficiente en la cuenta origen', resultado: null });
    }

    // 5. Crear transacción en la tabla
    const nuevaTransaccion = await Transaccion1.create({
      fecha,
      monto,
      id_cuenta_origen,
      id_cuenta_destino,
      id_cajero
    }, { transaction: t });

    // 6. Actualizar saldos
    cuentaOrigen.saldo = parseFloat(cuentaOrigen.saldo) - parseFloat(monto);
    cuentaDestino.saldo = parseFloat(cuentaDestino.saldo) + parseFloat(monto);

    await cuentaOrigen.save({ transaction: t });
    await cuentaDestino.save({ transaction: t });

    // 7. Confirmar todo
    await t.commit();

    res.status(201).json({ mensaje: 'Transacción realizada con éxito', resultado: nuevaTransaccion });
  } catch (err) {
    await t.rollback(); // Revertir si algo falla
    console.error('Error en registrarTransaccion:', err);
    res.status(500).json({ mensaje: 'Error al registrar transacción', resultado: null });
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

// NUEVA FUNCIÓN 1 - Retirar dinero
const retirarDinero = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id_cuenta, monto } = req.body;

    if (monto <= 0) {
      await t.rollback();
      return res.status(400).json({ mensaje: 'El monto debe ser mayor a 0', resultado: null });
    }

    const cuenta = await Cuenta1.findByPk(id_cuenta, { transaction: t });
    if (!cuenta) {
      await t.rollback();
      return res.status(404).json({ mensaje: 'Cuenta no encontrada', resultado: null });
    }

    console.log("💰 Saldo actual:", cuenta.saldo);
    console.log("💸 Monto solicitado:", monto);


    if (cuenta.saldo < monto) {
      await t.rollback();
      return res.status(400).json({ mensaje: 'Saldo insuficiente', resultado: null });
    }

    cuenta.saldo = parseFloat(cuenta.saldo) - parseFloat(monto);
    await cuenta.save({ transaction: t });

    console.log("💾 Saldo actualizado en BD:", cuenta.saldo);

    console.log("📝 Registrando transacción (retiro)...");

    // Registrar la transacción como "retiro"
    const retiro = await Transaccion1.create({
      fecha: new Date(),
      monto,
      id_cuenta_origen: id_cuenta,
      id_cuenta_destino: null,
      id_cajero: 3
    }, { transaction: t });

    console.log("✔️ Transacción registrada:", retiro.id_transaccion);

    await t.commit();
    consolelog('Retiro exitoso:', retiro);

    res.status(200).json({ mensaje: 'Retiro exitoso', resultado: retiro });
  } catch (err) {
    await t.rollback();
    console.error('Error en retirarDinero:', err);
    res.status(500).json({ mensaje: 'Error al retirar dinero', resultado: null });
  }
};



// NUEVA FUNCIÓN 2 - Consignar dinero
const consignarDinero = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id_cuenta, monto } = req.body;

    if (monto <= 0) {
      await t.rollback();
      return res.status(400).json({ mensaje: 'El monto debe ser mayor a 0', resultado: null });
    }

    const cuenta = await Cuenta1.findByPk(id_cuenta, { transaction: t });
    if (!cuenta) {
      await t.rollback();
      return res.status(404).json({ mensaje: 'Cuenta no encontrada', resultado: null });
    }

    cuenta.saldo = parseFloat(cuenta.saldo) + parseFloat(monto);
    await cuenta.save({ transaction: t });

    // Registrar la transacción como "consignación"
    const consignacion = await Transaccion1.create({
      fecha: new Date(),
      monto,
      id_cuenta_origen: null,
      id_cuenta_destino: id_cuenta,
      id_cajero: 3
    }, { transaction: t });

    await t.commit();
    res.status(200).json({ mensaje: 'Consignación exitosa', resultado: consignacion });
  } catch (err) {
    await t.rollback();
    console.error('Error en consignarDinero:', err);
    res.status(500).json({ mensaje: 'Error al consignar dinero', resultado: null });
  }
};

module.exports = {
  registrarTransaccion,
  listarTransacciones,
  obtenerTransaccionPorId,
  retirarDinero,
  consignarDinero
};
