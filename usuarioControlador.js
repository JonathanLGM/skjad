const { Usuario1, Cuenta1, Cliente1, sequelize } = require('./db'); // Importar modelos y sequelize
const { Op } = require('sequelize');
const bcrypt = require('bcrypt'); // encriptador

// Crear usuario + cuenta
const registrarUsuario = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { username, password, fecha_inicio, rol, estado, id_cliente } = req.body;

    // Validar duplicados de username
    if (await Usuario1.findOne({ where: { username } })) {
      return res.status(400).json({ mensaje: 'El usuario ya está registrado' });
    }

    // Validar si el cliente ya tiene cuenta
    const cuentaExistente = await Cuenta1.findOne({ where: { id_cliente } });
    if (cuentaExistente) {
      return res.status(400).json({ mensaje: 'El cliente ya tiene una cuenta registrada' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario con la contraseña encriptada
    const nuevoUsuario = await Usuario1.create(
      { username, password: hashedPassword, fecha_inicio, rol, estado, id_cliente },
      { transaction }
    );

    // Generar número de cuenta aleatorio de 10 dígitos
    const numeroCuenta = Math.floor(1000000000 + Math.random() * 9000000000);

    // Crear cuenta ligada al usuario
    await Cuenta1.create({
      id_cuenta: numeroCuenta,       
      id_usuario: nuevoUsuario.id_usuario,
      id_cliente: id_cliente,
      rol: 'usuario',  // ✅ Guardar automáticamente como "usuario"
      estado: 'activa',
      saldo: 0,
      fecha_apertura: fecha_inicio
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

const obtenerCuentaPorUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const usuario = await Usuario1.findOne({
      where: { username },
      include: {
        model: Cliente1,
        include: {
          model: Cuenta1,
          attributes: ['id_cuenta', 'saldo']
        }
      }
    });

    const cuenta = usuario?.Cliente1?.Cuenta1 || null;

    // Devuelve JSON desde el inicio
    res.json({ resultado: cuenta });

  } catch (err) {
    console.error("Error Sequelize:", err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

module.exports = {
  registrarUsuario,
  listarUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  borrarUsuario,
  obtenerCuentaPorUsername
};
