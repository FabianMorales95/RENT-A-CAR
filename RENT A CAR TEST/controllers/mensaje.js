var validator = require ("validator");
var mensajes = require("../models/mensaje");

var controller = {
    
    save: function(req,res){
        var params = req.body;
        var validate_idcarro = !validator.isEmpty(params.idCarro);
        console.log(validate_idcarro);

        var validate_texto = !validator.isEmpty(params.texto);
        console.log(validate_texto);


        console.log(params.idCarro,params.texto);

        if (validate_idcarro && validate_texto){
            var mensaje = new mensajes();

            mensaje.idCarro = params.idCarro;
            mensaje.texto = params.texto;

            console.log(mensaje);
            mensaje.save((error,mensajeStored) => {
                if (error || !mensajeStored){
                    return res.status(404).send({
                        message:"El mensaje no se guardo",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"Mensaje guardado"
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
        var mensajeId = req.params.id;
        console.log(mensajeId);
        var validate_idcarro = !validator.isEmpty(params.idcarro);
        var validate_texto = !validator.isEmpty(params.texto);
        
        if(validate_idcarro && validate_texto){
            
            var update = {
                idcarro:params.idcarro,
                texto:params.texto,
                
            }

            mensaje.findOneAndUpdate({_id:mensajeId},update,{new:true},(error,carUpdate)=>{
                if(error){
                    return res.status(500).send({
                        message:"Error en la peticiòn",
                        status:"Error"
                    });
                }

                if(!carUpdate){
                    return res.status(404).send({
                        message:"Usuario no actualizado",
                        status:"Error"
                    });
                }

                return res.status(200).send({
                    message:"actualizado correctamente",
                    status:"Success",
                    mensajeUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"Validación de datos invalido"
            });
        }
        
    },

    eliminar: function (req,res){

        var mensajeId = req.params.id;
        mensaje.findOneAndDelete({_id:mensajeId},(error, mensajeRemoved) =>{
            if(error){
                return res.status(500).send({
                    message:"Error en la peticiòn",
                    status:"Error"
                });
            }

            if(!mensajeRemoved){
                return res.status(404).send({
                    message:"Mensaje no eliminado",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Eliminado existosamente",
                mensaje: mensajeRemoved
            });
        })
  
    },

    listarmensaje: function (req,res){

        mensaje.find(function(error,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Mensajes",
                doc
            });
        });  
    },

    mostrarmensaje: function (req,res){

        var mensajeId = req.params.id;
        mensaje.findById(mensajeId)
            .exec((error,mensaje)=>{
                if(error){
                    return res.status(500).send({
                        message:"Error en la peticiòn",
                        status:"Error"
                    });
                }
    
                if(!mensaje){
                    return res.status(404).send({
                        message:"Mensaje no eliminado",
                        status:"Error"
                    });
                }
                return res.status(200).send({
                    message:"Este es un mensaje",
                    mensaje
                });
            })

    }

}

//para exportar lo que hagamos dentro de controller

module.exports = controller;