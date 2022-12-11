const mongoose = require("mongoose");
var Schema = mongoose.Schema;


var CalificacionSchema = Schema({
    calificacion: Number,
    mensaje: String,
    idReserva: {type:Schema.ObjectId, ref:"reservas"},
    
})
module.exports = mongoose.model("Calificacion",CalificacionSchema);

