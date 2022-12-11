var express = require('express');
var ReservationController = require("../controllers/reservas");

var router = express.Router();

router.get("/probando", ReservationController.probando);

router.post("/guardarReserva", ReservationController.save);
router.post("/login", ReservationController.login);
router.put("/actualizarReserva/:id", ReservationController.update);
router.delete("/cancelarReserva/:id", ReservationController.cancelar);
router.get("/listarReservas", ReservationController.listarReservas);
router.get("/Reserva/:id", ReservationController.mostrarReserva);


module.exports = router;