const Joi = require('joi');
const { Usuario } = require('../baseDatos/index');

// ✅ Validaciones con Joi
const validadorUsuario = Joi.object({
  username: Joi.string().min(4).max(20).required(),
  password: Joi.string().min(6).required(),
  fecha_inicio: Joi.date().required(),
  fecha_final: Joi.date().allow(null),
  rol: Joi.string().required(),
  estado: Joi.string().required(),
  id_cliente: Joi.number().integer().required()
});

// ✅ Crear usuario
const registrarUsuario = async (req, res) => {
  try {
    const { error } = validadorUsuario.validate(req.body, { abortEarly: false });
    if (error) {
      const errores = error.details.map(det => det.message).join('|');
      return res.status(400).json({ mensaje: 'Errores en validación', errores });
    }

    const { username, password, fecha_inicio, fecha_final, rol, estado, id_cliente } = req.body;

    const usuarioExistente = await Usuario.findOne({ where: { username } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe', resultado: null });
    }

    const nuevoUsuario = await Usuario.create({ username, password, fecha_inicio, fecha_final, rol, estado, id_cliente });
    res.status(201).json({ mensaje: 'Usuario creado', resultado: nuevoUsuario });

  } catch (err) {
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// ✅ Listar usuarios
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json({ mensaje: 'Usuarios listados', resultado: usuarios });
  } catch (err) {
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// ✅ Actualizar usuario
const actualizarUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const { username, password, fecha_inicio, fecha_final, rol, estado, id_cliente } = req.body;

    const usuario = await Usuario.findByPk(id_usuario);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado', resultado: null });

    await usuario.update({ username, password, fecha_inicio, fecha_final, rol, estado, id_cliente });
    res.status(200).json({ mensaje: 'Usuario actualizado', resultado: usuario });

  } catch (err) {
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// ✅ Eliminar usuario
const borrarUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const usuario = await Usuario.findByPk(id_usuario);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado', resultado: null });

    await usuario.destroy();
    res.status(200).json({ mensaje: 'Usuario eliminado', resultado: usuario });

  } catch (err) {
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

module.exports = {
  registrarUsuario,
  listarUsuarios,
  actualizarUsuario,
  borrarUsuario
};
