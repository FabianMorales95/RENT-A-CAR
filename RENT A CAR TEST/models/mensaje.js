const { Schema } = require('mongoose');
const mongoose = require('mongoose');
var Shema = mongoose.Schema;

var mensajeSchema = new Shema({   /// me va a decir los campos que va a tener el json
    idCarro: {type:Schema.ObjectId, ref:"Carros"},
    texto:String
})

module.exports = mongoose.model("mensaje", mensajeSchema);