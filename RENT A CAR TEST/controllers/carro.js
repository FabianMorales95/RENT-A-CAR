var validator = require ("validator");
var Carro = require("../models/Carros");

var controller = {
    probando: function (req,res){
        return res.status(200).send({
            message:"Estoy en el metodo probando"
        });
    },

    testeando: function(req,res){
        return res.status(200).send({
            message:"Estoy en el metodo testeando"
        });
    },

    save: function(req,res){
        var params = req.body;
        var validate_marca = !validator.isEmpty(params.marca);
        console.log(validate_marca);

        var validate_name = !validator.isEmpty(params.name);
        console.log(validate_name);

        var validate_anho= !validator.isEmpty(params.anho);
        console.log(validate_anho);

        var validate_description = !validator.isEmpty(params.description);
        console.log(validate_description);

        var validate_gama = !validator.isEmpty(params.gama);
        console.log(validate_gama);

        console.log(params.marca,params.name, params.anho,params.gama,params.description);

        if (validate_marca && validate_name && validate_anho && validate_description && validate_gama){
            var carro = new Carro();

            carro.marca = params.marca;
            carro.name = params.name;
            carro.anho = params.anho;
            carro.gama = params.gama;          
            carro.description= params.description;
     
  

            console.log(carro);
            carro.save((error,carroStored) => {
                if (error || !carroStored){
                    return res.status(404).send({
                        message:"El carro no se guardo",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"Carro guardado"
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
        var carroId = req.params.id;
        console.log(carroId);
        var validate_marca = !validator.isEmpty(params.marca);
        var validate_name = !validator.isEmpty(params.name);
        var validate_anho = !validator.isEmpty(params.anho);
        var validate_gama = !validator.isEmpty(params.gama);       
        var validate_description = !validator.isEmpty(params.description);
        if(validate_marca && validate_name && validate_anho && validate_gama && validate_description){
            
            var update = {
                marca:params.marca,
                name:params.name,
                anho:params.anho,
                gama:params.gama,
                description:params.description

            }

            Carro.findOneAndUpdate({_id:CarroId},update,{new:true},(error,carUpdate)=>{
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
                    carUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"Validación de datos invalido"
            });
        }
        
    },

    eliminar: function (req,res){

        var carroId = req.params.id;
        carro.findOneAndDelete({_id:carroId},(error,carRemoved) =>{
            if(error){
                return res.status(500).send({
                    message:"Error en la peticiòn",
                    status:"Error"
                });
            }

            if(!carroRemoved){
                return res.status(404).send({
                    message:"Carro no eliminado",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Eliminado existosamente",
                carro: carroRemoved
            });
        })
  
    },

    listarCarros: function (req,res){

        carro.find(function(error,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Carros",
                doc
            });
        });  
    },

    mostrarCarro: function (req,res){

        var carroId = req.params.id;
        Carro.findById(carroId)
            .exec((error,carro)=>{
                if(error){
                    return res.status(500).send({
                        message:"Error en la peticiòn",
                        status:"Error"
                    });
                }
    
                if(!carro){
                    return res.status(404).send({
                        message:"Carro no eliminado",
                        status:"Error"
                    });
                }
                return res.status(200).send({
                    message:"Este es un carro",
                    usuario
                });
            })

    }

}

//para exportar lo que hagamos dentro de controller

module.exports = controller;