const express = require('express');
const router = express.Router();
const transaccionControlador = require('./transaccionControlador'); // Importar controlador

// Crear transacción
router.post('/', transaccionControlador.registrarTransaccion);

// Obtener todas las transacciones
router.get('/', transaccionControlador.listarTransacciones);

// Obtener una transacción por id
router.get('/:id_transaccion', transaccionControlador.obtenerTransaccionPorId);

router.post('/retirar', transaccionControlador.retirarDinero);

router.post('/consignar', transaccionControlador.consignarDinero);

router.get('/ultimo-retiro', async (req, res) => {
  try {
    // Tomamos la última transacción que NO tiene cuenta destino (retiro)
    const ultimoRetiro = await Transaccion1.findOne({
      where: { id_cuenta_destino: null }, 
      order: [['id_transaccion', 'DESC']]
    });

    if (!ultimoRetiro) {
      return res.json({
        mensaje: "No hay retiros registrados aún."
      });
    }

    res.json({
      mensaje: "Último retiro realizado",
      retiro: ultimoRetiro
    });
  } catch (err) {
    console.error("Error consultando último retiro:", err);
    res.status(500).json({ error: "Error interno en la consulta" });
  }
});

module.exports = router;
