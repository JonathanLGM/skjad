const express = require('express');
const router = express.Router();
const clienteControlador = require('./clienteControlador'); // ahora todo está en raíz

// Crear cliente
router.post('/', clienteControlador.registrarCliente);

// Obtener todos los clientes (con alias /listar)
router.get('/listarcliente', clienteControlador.listarClientes);

// Obtener un cliente por id
router.get('/:id_cliente', clienteControlador.obtenerClientePorId);

// Actualizar cliente
router.put('/:id_cliente', clienteControlador.actualizarCliente);

// Eliminar cliente
router.delete('/:id_cliente', clienteControlador.borrarCliente);

// Listar cuentas de un cliente específico
router.get('/listarPorCliente/:id_cliente', async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const cuentas = await Cuenta1.findAll({ where: { id_cliente } });

    if (cuentas.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron cuentas para este cliente" });
    }

    res.json({ mensaje: "Cuentas encontradas", resultado: cuentas });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
});

module.exports = router;
