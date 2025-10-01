const { Usuario1, Cuenta1, Cliente1, sequelize } = require('./db'); // Importar modelos y sequelize
const { Op } = require('sequelize');

// Crear usuario + cuenta
const registrarUsuario = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { username, fecha_inicio, id_cliente } = req.body;

    // Validar duplicados
    if (await Usuario1.findOne({ where: { username } })) {
      return res.status(400).json({ mensaje: 'El usuario ya está registrado' });
    }

    // Crear usuario
    const nuevoUsuario = await Usuario1.create(req.body, { transaction });

    // Generar número de cuenta aleatorio de 10 dígitos
    const numeroCuenta = Math.floor(1000000000 + Math.random() * 9000000000);

    // Crear cuenta ligada al usuario
    await Cuenta1.create({
      id_cuenta: numeroCuenta,       // ← este será el "número de cuenta"
      id_usuario: nuevoUsuario.id_usuario,
      id_cliente: id_cliente,        // ← tomado del formulario
      estado: 'activa',
      saldo: 0,
      fecha_apertura: fecha_inicio   // ← usas la fecha que metes en el form
    }, { transaction });

    await transaction.commit();
    res.status(201).json({ mensaje: 'Usuario y cuenta creados', resultado: nuevoUsuario });

  } catch (err) {
    await transaction.rollback();
    console.error('Error en registrarUsuario:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Listar usuarios
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario1.findAll();
    res.status(200).json({ mensaje: 'Usuarios listados', resultado: usuarios });
  } catch (err) {
    console.error('Error en listarUsuarios:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Obtener usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario1.findByPk(req.params.id_usuario);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado', resultado: null });
    res.status(200).json({ mensaje: 'Usuario encontrado', resultado: usuario });
  } catch (err) {
    console.error('Error en obtenerUsuarioPorId:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Actualizar usuario
const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario1.findByPk(req.params.id_usuario);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado', resultado: null });

    await usuario.update(req.body);
    res.status(200).json({ mensaje: 'Usuario actualizado', resultado: usuario });
  } catch (err) {
    console.error('Error en actualizarUsuario:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Eliminar usuario
const borrarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario1.findByPk(req.params.id_usuario);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado', resultado: null });

    await usuario.destroy();
    res.status(200).json({ mensaje: 'Usuario eliminado', resultado: usuario });
  } catch (err) {
    console.error('Error en borrarUsuario:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

async function obtenerCuentaPorUsername(username) {
  try {
    const usuario = await Usuario1.findOne({
      where: { username },           // WHERE u.username = '...'
      include: {
        model: Cliente1,             // JOIN cliente cl ON u.id_cliente = cl.id_cliente
        include: {
          model: Cuenta1,            // JOIN cuenta c ON cl.id_cliente = c.id_cliente
          attributes: ['id_cuenta', 'saldo'] // SELECT c.id_cuenta, c.saldo
        }
      }
    });

    // Devuelve solo la primera cuenta si hay varias
    const cuenta = usuario?.Cliente1?.Cuentas1[0] || null; // o usuario.Cliente1.Cuentas según tu relación
    return cuenta;

  } catch (err) {
    console.error("Error Sequelize:", err);
    return null;
  }
}

// Ejemplo de uso:
const username = 'Jonathanm05'; // reemplazar por el username que tengas en cache
obtenerCuentaPorUsername(username).then(cuenta => {
  console.log(cuenta); // { id_cuenta: ..., saldo: ... } o null
});



module.exports = {
  registrarUsuario,
  listarUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  borrarUsuario,
  obtenerCuentaPorUsername
};
