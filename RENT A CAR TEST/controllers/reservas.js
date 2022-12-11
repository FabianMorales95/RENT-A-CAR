var validator = require("validator");
var reservas = require("../models/reservas");  /// ../para salir de la carpeta

var controller = {
    probando: function(req, res) {
        return res.status(200).send({
            message: "Estoy en el metodo probando reservas"
        });

    },

    save:function(req, res) {
        var params = req.body;
        var validate_Carro= !validator.isEmpty(params.idCarro);
        console.log(validate_Carro);
        var validate_Cliente= !validator.isEmpty(params.idCliente);
        console.log(validate_Cliente);
        var validate_fechaInicio= validator.isDate(params.fechaInicio);
        console.log(validate_fechaInicio);
        var validate_fechaFin= validator.isDate(params.fechaFin);
        console.log(validate_fechaFin);
        
            if (validate_Carro && validate_Cliente && validate_fechaInicio && validate_fechaFin){
                var reserva = new reservas();
                reserva.idCarro = params.idCarro;
                reserva.idCliente = params.idCliente;
                reserva.fechaInicio = params.fechaInicio;
                reserva.fechaFin = params.fechaFin;
                reserva.Status = "Creado"
            
                console.log(reserva);

                reserva.save((err, reservaStored) => {
                    if (err || !reservaStored) {
                        return res.status(404).send({
                            message: "La reserva no se guardó",
                            status: "Error"
                        });
                    }
                    return res.status(200).send({
                        message: "Reserva Creada"
                    });
                });

            }else{
                return res.status(200).send({
                    message: "Validación de datos incorrecta"
                });

            }

    },

    login:function(req, res) {
        return res.status(200).send({
            message: "Login success"
        });
    },

    update:function(req, res) {
        var params = req.body;
        var reservaId = req.params.id;
        console.log(reservaId);

        var validate_Carro= !validator.isEmpty(params.idCarro);
        var validate_Cliente= !validator.isEmpty(params.idCliente);
        var validate_fechaInicio= !validator.isEmpty(params.fechaInicio);
        var validate_fechaFin= !validator.isEmpty(params.fechaFin);
        
        if (validate_Carro && validate_Cliente && validate_fechaInicio && validate_fechaFin){
            var update = {
            idCarro: params.idCarro,
            idCliente: params.idCliente,
            fechaInicio : params.fechaInicio,
            fechaFin : params.fechaFin,
            Status : "Creado"
            }

            reservas.findOneAndUpdate({reservaId}, update, {new:true}, (err, reservasUpdate) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error en la petición",
                        status:"Error"
                    });
                }

                if(!reservasUpdate){
                    return res.status(404).send({
                        message: "Reserva no actualizada",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message: "Reserva Actualizada",
                    status: "success",
                    reservasUpdate
                });
            })
           
           

    } else {
        return res.status(200).send({
            message: "Validación de datos incorrecta"
            });
         }

    },


    cancelar:function(req, res) {
        var reservaId = req.params.id;
        reservas.findOneAndDelete({_id:reservaId}, (err, reservaRemoved) => {
            if (err) {
                return res.status(500).send({
                    message: "Error en la petición",
                    status:"Error"
                });
            }

            if(!reservaRemoved){
                return res.status(404).send({
                    message: "Reserva no cancelada",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message: "Reserva Cancelada",
                usuario:reservaRemoved
            });
        })
        
    },

    listarReservas:function(req, res) {

        reservas.find(function(err,doc){
            console.log(doc);
            return res.status(200).send({
                message: "Lista de Reservas",
                doc
            });
        });
    },

    mostrarReserva:function(req, res) {
        var reservaId = req.params.id;
        reservas.findById(reservaId)
            .exec((err,reserva) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error en la petición",
                        status:"Error"
                    });
                }

                if(!reserva){
                    return res.status(404).send({
                        message: "Reserva no encontrada",
                        status:"Error"
                    });
                }
                return res.status(200).send({
                    message: "Esta es una reserva",
                    reserva
                });

            
            })
        
    }
}

module.exports = controller;