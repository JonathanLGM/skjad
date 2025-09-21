const Joi = require('joi');
const { Cliente } = require('../baseDatos/index');

// ✅ Validación con Joi
const validadorCliente = Joi.object({
  nombre: Joi.string().min(2).max(50).required(),
  apellido: Joi.string().min(2).max(50).required(),
  documento: Joi.string().min(6).max(12).required(),
  telefono: Joi.string().pattern(/^[0-9]{7,10}$/).allow(null, ''),
  direccion: Joi.string().max(100).allow(null, ''),
  correo: Joi.string().email().required(),
  id_barrio: Joi.number().integer().required()
});

// ✅ Crear cliente
const registrarCliente = async (req, res) => {
  try {
    const { error } = validadorCliente.validate(req.body, { abortEarly: false });
    if (error) {
      const errores = error.details.map(det => det.message).join(' | ');
      return res.status(400).json({ mensaje: 'Errores en validación', errores });
    }

    const { documento, correo } = req.body;

    // Validar duplicados
    const clienteExistente = await Cliente.findOne({ where: { documento } });
    if (clienteExistente) return res.status(400).json({ mensaje: 'El documento ya está registrado' });

    const correoExistente = await Cliente.findOne({ where: { correo } });
    if (correoExistente) return res.status(400).json({ mensaje: 'El correo ya está registrado' });

    const nuevoCliente = await Cliente.create(req.body);
    res.status(201).json({ mensaje: 'Cliente creado', resultado: nuevoCliente });

  } catch (err) {
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// ✅ Listar clientes
const listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json({ mensaje: 'Clientes listados', resultado: clientes });
  } catch (err) {
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// ✅ Obtener cliente por ID
const obtenerClientePorId = async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const cliente = await Cliente.findByPk(id_cliente);

    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado', resultado: null });

    res.status(200).json({ mensaje: 'Cliente encontrado', resultado: cliente });
  } catch (err) {
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// ✅ Actualizar cliente
const actualizarCliente = async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const cliente = await Cliente.findByPk(id_cliente);

    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado', resultado: null });

    await cliente.update(req.body);
    res.status(200).json({ mensaje: 'Cliente actualizado', resultado: cliente });

  } catch (err) {
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// ✅ Eliminar cliente
const borrarCliente = async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const cliente = await Cliente.findByPk(id_cliente);

    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado', resultado: null });

    await cliente.destroy();
    res.status(200).json({ mensaje: 'Cliente eliminado', resultado: cliente });

  } catch (err) {
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

module.exports = {
  registrarCliente,
  listarClientes,
  obtenerClientePorId,
  actualizarCliente,
  borrarCliente
};
