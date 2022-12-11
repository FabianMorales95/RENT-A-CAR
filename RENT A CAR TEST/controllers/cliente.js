var validator = require("validator");
var Usuario = require("../models/cliente");

var controller = {
 
    save: function(req,res){

        var params = req.body;
        var validate_name = !validator.isEmpty(params.name);
        console.log(validate_name);

        var validate_email = validator.isEmail(params.email) && !validator.isEmpty(params.email);
        console.log(validate_email);

        var validate_age = !validator.isEmpty(params.age);
        console.log(validate_age);

        var validate_password = !validator.isEmpty(params.password);
        console.log(validate_password);

        console.log(params.name,params.email,params.age,params.password);

        if (validate_name && validate_email && validate_age && validate_password){

            var usuario = new Usuario();

            usuario.name = params.name;
            usuario.email = params.email;
            usuario.age = params.age;
            usuario.password = params.password;

            console.log(usuario);

            usuario.save((error,userStored) => {

                if (error || !userStored){

                    return res.status(404).send({
                        message:"El Cliente no se guardo",
                        status: "Error"
                    });
                }
                return res.status(200).send({
                    message:"Cliente guardado"
                });
            });
         
        }else{
            return res.status(404).send({
                message:"Validaciòn de datos incorrecta"
            });
        }
    },

    update:function(req,res){

        var params = req.body;
        var usuarioId = req.params.id;
        console.log(usuarioId);

        var validate_name = !validator.isEmpty(params.name);
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        var validate_age = !validator.isEmpty(params.age);
        var validate_password = !validator.isEmpty(params.password);

        if(validate_name  && validate_email && validate_age && validate_password){
            
            var update = {

                name:params.name,
                email:params.email,
                age:params.age,
                password:params.password
            }

                Usuario.findOneAndUpdate({_id:usuarioId},update,{new:true},(error,userUpdate)=>{

                if(error){

                    return res.status(500).send({
                        message:"Error en la peticiòn de actulizaciòn",
                        status:"Error"
                    });
                }

                if(!userUpdate){

                    return res.status(404).send({
                        message:"Cliente no actualizado",
                        status:"Error"
                    });
                }

                return res.status(200).send({

                    message:"Cliente actualizado correctamente",
                    status:"Success",
                    userUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"Validación de datos invalida"
            });
        }
        
    },

    eliminar: function (req,res){

        var usuarioId = req.params.id;
        Usuario.findOneAndDelete({_id:usuarioId},(error,userRemoved) =>{

            if(error){

                return res.status(500).send({
                    message:"Error en la peticiòn de eliminar",
                    status:"Error"
                });
            }

            if(!userRemoved){

                return res.status(404).send({
                    message:"Cliente no eliminado",
                    status:"Error"
                });
            }

            return res.status(200).send({

                message:"Cliente eliminado existosamente",
                usuario: userRemoved
            });
        })
  
    },

    mostrarClientes: function (req,res){

        Usuario.find(function(error,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Totalidad de Clientes",
                doc
            });
        });  
    },

    mostrarCliente: function (req,res){

        var usuarioId = req.params.id;
        Usuario.findById(usuarioId)
            .exec((error,usuario)=>{

                if(error){
                    return res.status(500).send({
                        message:"Error en la peticiòn mostrar cliente",
                        status:"Error"
                    });
                }
    
                if(!usuario){
                    return res.status(404).send({
                        message:"Cliente no encontrado",
                        status:"Error"
                    });
                }
                return res.status(200).send({
                    message:"Este es el cliente",
                    usuario
                });
            })

    }

}

module.exports = controller;