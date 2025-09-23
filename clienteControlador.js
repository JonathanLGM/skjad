// clienteControlador.js
const { Cliente } = require('./Cliente'); // ajusta la ruta si es necesario

// Crear cliente
const registrarCliente = async (req, res) => {
  try {
    // Excluir id_cliente para que Postgres lo autoincremente
    const { id_cliente, ...data } = req.body;
    const nuevoCliente = await Cliente.create(data);
    res.status(201).json(nuevoCliente);
  } catch (error) {
    console.error("❌ Error al guardar cliente:", error);
    res.status(500).json({ error: "Error al guardar cliente" });
  }
};

// Listar clientes
const listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    console.error("❌ Error al listar clientes:", error);
    res.status(500).json({ error: "Error al listar clientes" });
  }
};

// Obtener cliente por ID
const obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id_cliente);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.json(cliente);
  } catch (error) {
    console.error("❌ Error al obtener cliente:", error);
    res.status(500).json({ error: "Error al obtener cliente" });
  }
};

// Actualizar cliente
const actualizarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id_cliente);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    await cliente.update(req.body);
    res.json(cliente);
  } catch (error) {
    console.error("❌ Error al actualizar cliente:", error);
    res.status(500).json({ error: "Error al actualizar cliente" });
  }
};

// Eliminar cliente
const borrarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id_cliente);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    await cliente.destroy();
    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar cliente:", error);
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
};

module.exports = {
  registrarCliente,
  listarClientes,
  obtenerClientePorId,
  actualizarCliente,
  borrarCliente
};
