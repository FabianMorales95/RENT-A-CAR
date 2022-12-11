var express = require("express");
var CarController = require("../controllers/carro");

var router = express.Router();

router.get("/probando",CarController.probando);
router.post("/testeando",CarController.testeando);

router.post("/guardarCarro",CarController.save);
router.post("/login",CarController.login);
router.put("/actualizar/:id",CarController.update);
router.delete("/eliminar/:id",CarController.eliminar);
router.get("/carros",CarController.listarCarros);
router.get("/carro/:id",CarController.mostrarCarro);


module.exports = router;
