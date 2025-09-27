// controllers/transaccionController.js
const { Transaccion, Cliente, Cuenta, Cajero, Tipo } = require("../models");

const transaccionController = {
  // Crear transacción
  crear: async (req, res) => {
    try {
      const { fecha, monto, id_cliente, id_cuenta, id_cajero, id_tipo } = req.body;
      const nuevaTransaccion = await Transaccion.create({
        fecha,
        monto,
        id_cliente,
        id_cuenta,
        id_cajero,
        id_tipo
      });
      res.status(201).json(nuevaTransaccion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Listar todas
  listar: async (req, res) => {
    try {
      const transacciones = await Transaccion.findAll({
        include: [Cliente, Cuenta, Cajero, Tipo]
      });
      res.json(transacciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Buscar por id
  obtener: async (req, res) => {
    try {
      const { id } = req.params;
      const transaccion = await Transaccion.findByPk(id, {
        include: [Cliente, Cuenta, Cajero, Tipo]
      });
      if (!transaccion) return res.status(404).json({ error: "No encontrada" });
      res.json(transaccion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Actualizar
  actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { fecha, monto, id_cliente, id_cuenta, id_cajero, id_tipo } = req.body;
      const transaccion = await Transaccion.findByPk(id);
      if (!transaccion) return res.status(404).json({ error: "No encontrada" });

      await transaccion.update({ fecha, monto, id_cliente, id_cuenta, id_cajero, id_tipo });
      res.json(transaccion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Eliminar
  eliminar: async (req, res) => {
    try {
      const { id } = req.params;
      const transaccion = await Transaccion.findByPk(id);
      if (!transaccion) return res.status(404).json({ error: "No encontrada" });

      await transaccion.destroy();
      res.json({ mensaje: "Transacción eliminada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = transaccionController;
