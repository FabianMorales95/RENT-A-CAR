var express = require ("express");
var UserController = require("../controllers/cliente");

var router = express.Router();

router.post("/guardarCliente",UserController.save);
router.put("/actualizar/:id",UserController.update);
router.delete("/eliminar/:id",UserController.eliminar);
router.get("/clientes",UserController.mostrarClientes);
router.get("/cliente/:id",UserController.mostrarCliente);

module.exports = router;
