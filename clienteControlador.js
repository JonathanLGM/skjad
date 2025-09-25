const { Cliente1 } = require('./db'); // Importar modelo Cliente1

// Crear cliente
const registrarCliente = async (req, res) => {
  try {
    const { documento, correo } = req.body;

    // Validar duplicados
    if (await Cliente1.findOne({ where: { documento } })) {
      return res.status(400).json({ mensaje: 'El documento ya está registrado' });
    }

    if (await Cliente1.findOne({ where: { correo } })) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const nuevoCliente = await Cliente1.create(req.body);
    res.status(201).json({ mensaje: 'Cliente creado', resultado: nuevoCliente });
  } catch (err) {
    console.error('Error en registrarCliente:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Listar clientes
const listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente1.findAll();
    res.status(200).json({ mensaje: 'Clientes listados', resultado: clientes });
  } catch (err) {
    console.error('Error en listarClientes:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Obtener cliente por ID
const obtenerClientePorId = async (req, res) => {
  try {
    // 👇 Aquí ves exactamente qué llega desde la URL
    console.log('Params recibidos en obtenerClientePorId:', req.params);

    const cliente = await Cliente1.findByPk(req.params.id_cliente);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado', resultado: null });
    }

    res.status(200).json({ mensaje: 'Cliente encontrado', resultado: cliente });
  } catch (err) {
    console.error('Error en obtenerClientePorId:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};


// Actualizar cliente
const actualizarCliente = async (req, res) => {
  try {
    const cliente = await Cliente1.findByPk(req.params.id_cliente);
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado', resultado: null });

    await cliente.update(req.body);
    res.status(200).json({ mensaje: 'Cliente actualizado', resultado: cliente });
  } catch (err) {
    console.error('Error en actualizarCliente:', err);
    res.status(500).json({ mensaje: err.message, resultado: null });
  }
};

// Eliminar cliente
const borrarCliente = async (req, res) => {
  try {
    const cliente = await Cliente1.findByPk(req.params.id_cliente);
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado', resultado: null });

    await cliente.destroy();
    res.status(200).json({ mensaje: 'Cliente eliminado', resultado: cliente });
  } catch (err) {
    console.error('Error en borrarCliente:', err);
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
