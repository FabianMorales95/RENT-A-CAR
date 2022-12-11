var express = require('express');
var mensajeController = require("../controllers/mensaje");

var router = express.Router();

router.post("/guardarMensaje", mensajeController.save);
router.post("/login", mensajeController.login);
router.put("/actualizarMensaje/:id", mensajeController.update);
router.delete("/eliminarMensaje/:id", mensajeController.eliminar);
router.get("/listarMensaje", mensajeController.listarmensaje);
router.get("/Mensaje/:id", mensajeController.mostrarmensaje);


module.exports = router;