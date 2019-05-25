'use strict';
const mongoose = require("mongoose"),
      app = require("./app");

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/delgadotrueba', { useMongoClient: true })
    .then(function(){
            console.log("Conectado a mongodb://localhost:27017/delgadotrueba");

            app.listen(3000 , function (){
                console.log("API RESTfull conrrientdo en 3000");
            })
    })
    .catch(function(err){
        console.log(err);
    })


module.exports = mongoose;