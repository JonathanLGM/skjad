const { Usuario1, Cuenta1 } = require('./db'); // Importar modelos

// Crear usuario con cuenta asociada
const registrarUsuario = async (req, res) => {
  const transaction = await Usuario1.sequelize.transaction();
  try {
    const { username } = req.body;

    // Validar duplicados
    if (await Usuario1.findOne({ where: { username } })) {
      return res.status(400).json({ mensaje: 'El usuario ya está registrado' });
    }

    // Crear usuario
    const nuevoUsuario = await Usuario1.create(req.body, { transaction });

    // Generar número de cuenta único (ejemplo: 10 dígitos)
    let numeroCuenta;
    let existe = true;
    while (existe) {
      numeroCuenta = Math.floor(1000000000 + Math.random() * 9000000000); // 10 dígitos
      existe = await Cuenta1.findByPk(numeroCuenta, { transaction });
    }

    // Crear cuenta asociada
    const nuevaCuenta = await Cuenta1.create({
      id_cuenta: numeroCuenta,
      id_usuario: nuevoUsuario.id_usuario,
      saldo: 0,
      estado: 'activa'
      // fecha_apertura se genera sola si en el modelo tiene defaultValue: DataTypes.NOW
    }, { transaction });

    await transaction.commit();

    res.status(201).json({
      mensaje: 'Usuario y cuenta creados',
      resultado: {
        usuario: nuevoUsuario,
        cuenta: nuevaCuenta
      }
    });
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

module.exports = {
  registrarUsuario,
  listarUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  borrarUsuario
};
