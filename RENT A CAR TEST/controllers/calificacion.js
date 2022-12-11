var validator = require ("validator");
var Calificacion = require("../models/calificacion");

var controller = {
    
    save: function(req,res){

        var params = req.body;
        var validate_calificacion = !validator.isEmpty(params.calificacion);
        console.log(validate_calificacion);

        var validate_mensaje = !validator.isEmpty(params.mensaje);
        console.log(validate_mensaje);

        var validate_idreserva = !validator.isEmpty(params.idReserva);
        console.log(validate_idreserva);

        console.log(params.calificacion,params.mensaje,params.idReserva);

        if (validate_calificacion && validate_mensaje && validate_idreserva){
            
            var calificacion = new Calificacion();

            calificacion.calificacion = params.calificacion;
            calificacion.mensaje = params.mensaje;
            calificacion.idReserva = params.idReserva;

            console.log(calificacion);

            calificacion.save((error,calificacionStored) => { 
                if (error || !calificacionStored){
                    return res.status(404).send({
                        message:"La calificación no se guardo",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"Calificación Guardada"
                });
            });
         
        }else{
            return res.status(404).send({
                message:"Validaciòn de datos incorrecta"
            });
        }
    },

    login: function(req,res){
        return res.status(200).send({
            message:"Login"
        });
    },

    update:function(req,res){
        var params = req.body;
        var calificacionId = req.params.id;
        console.log(calificacionId);

        var validate_calificacion = !validator.isEmpty(params.calificacion);
        var validate_mensaje = !validator.isEmpty(params.mensaje);
        var validate_idreserva = !validator.isEmpty(params.idReserva);

        if(validate_calificacion && validate_mensaje && validate_idreserva){
            
            var update = {
                calificacion:params.calificacion,
                mensaje:params.mensaje,
                idReserva: params.idReserva
            }

            calificacion.findOneAndUpdate({_id:calificacionId},update,{new:true},(error,calificacionUpdate)=>{
                if(error){
                    return res.status(500).send({
                        message:"Error en la peticiòn",
                        status:"Error"
                    });
                }

                if(!calificacionUpdate){
                    return res.status(404).send({
                        message:"Calificacion no actualizada",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message:"Calificación actualizada correctamente",
                    status:"Success",
                    calificacionUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"Validación de datos invalido"
            });
        }
        
    },

    mostrarCalificaciones: function (req,res){

        calificacion.find(function(error,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Todas las Calificaciones almacenadas",
                doc
            });
        });  
    },

    mostrarCalificacion: function (req,res){

        var calificacionId = req.params.id;
        calificacion.findById(calificacionId)
            .exec((error,calificacion)=>{
                if(error){
                    return res.status(500).send({
                        message:"Error en la peticiòn",
                        status:"Error"
                    });
                }
                return res.status(200).send({
                    message:"Este es una Calificación",
                    calificacion
                });
            })

    }

}

//para exportar lo que hagamos dentro de controller

module.exports = controller;