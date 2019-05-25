"use strict"
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();


//cargar rutas
var article_routes = require("./routes/article");

//public
app.use('/public', express.static(__dirname + '/public'));

//middlewares de body-parse
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//Configurar Cabeceras y Cors
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Accept-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Aloow", "GET, POST, PUT, DELETE");
    res.setHeader("Content-Type", "application/json");
    next();
});

//rutas base
app.use("/", article_routes);


module.exports = app;