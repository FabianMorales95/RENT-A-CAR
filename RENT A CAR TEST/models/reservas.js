    const { Schema } = require('mongoose');
    const mongoose = require('mongoose');
    var Shema = mongoose.Schema;

    var reservasSchema = new Shema({   /// me va a decir los campos que va a tener el json
        idCarro: {type:Schema.ObjectId, ref:"Carros"},
        idCliente: {type:Schema.ObjectId, ref:"cliente"},
        fechaInicio: Date,
        fechaFin: Date,
        Status: String,
        Date: {type:Date, default: Date.now},
    })

    module.exports = mongoose.model("reservas", reservasSchema); 