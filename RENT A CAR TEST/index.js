const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const reservation_routes = require("./routes/reservas");
const carro_routes = require("./routes/carro");
const user_routes = require("./routes/cliente");
const mensaje_routes = require("./routes/mensaje");
const calificacion_routes = require("./routes/calificacion");

mongoose.Promise = global.Promise;
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect("mongodb://localhost:27017/rentaCar",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
})                    /// si se conecta a la bdd entonces haga tal cosa
.then(() =>{
    app.use("/api", reservation_routes);
    app.use("/api", carro_routes);
    app.use("/api", user_routes);
    app.use("/api", mensaje_routes);
    app.use("/api", calificacion_routes);

    app.listen(port, () =>{
        console.log("Servidor corriendo en el puerto", port);
    })
})

.catch(err =>console.log(err));  ///si no se conecta a la bdd