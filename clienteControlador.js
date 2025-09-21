const { Cliente } = require('./baseDatos/index'); // Ajusta según tu setup

const registrarCliente = async (req, res) => { /*... tu código ...*/ };
const listarClientes   = async (req, res) => { /*... tu código ...*/ };
const actualizarCliente = async (req, res) => { /*... tu código ...*/ };
const borrarCliente     = async (req, res) => { /*... tu código ...*/ };

const obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id_cliente);
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado', resultado: null });
    res.status(200).json({ mensaje: 'Cliente encontrado', resultado: cliente });
  } catch (err) {
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

module.exports = {
  registrarCliente,
  listarClientes,
  actualizarCliente,
  borrarCliente,
  obtenerClientePorId
};
