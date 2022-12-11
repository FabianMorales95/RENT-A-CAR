var express = require('express');
var calificacionController = require("../controllers/calificacion");

var router = express.Router();

router.post("/guardarCalificacion", calificacionController.save);
router.put("/actualizarCalificacion/:id", calificacionController.update);
router.get("/listarCalificaciones", calificacionController.mostrarCalificaciones);
router.get("/Calificacion/:id", calificacionController.mostrarCalificacion);

module.exports = router;