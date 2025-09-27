// routes/transaccionRoutes.js
const express = require("express");
const router = express.Router();
const transaccionController = require("../controllers/transaccionControlador");

// CRUD Transaccion
router.post("/", transaccionController.crear);
router.get("/", transaccionController.listar);
router.get("/:id", transaccionController.obtener);
router.put("/:id", transaccionController.actualizar);
router.delete("/:id", transaccionController.eliminar);

module.exports = router;
