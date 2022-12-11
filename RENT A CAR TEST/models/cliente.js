const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    name: String,
    email:String,
    age:String,
    password:String
})

module.exports = mongoose.model("Cliente", ClienteSchema);