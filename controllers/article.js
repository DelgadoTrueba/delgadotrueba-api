"use strict"

var Article = require("../models/article");

function obtenerArticles (req, res){

    Article.find({}, {"_id":0}).sort({"date.year":-1, "date.month":-1, "date.month":-1}).limit(9)
        .exec(function(err, examples){
                if(err) {
                    res.status(500).send("Error al obtener los Articulos");
                }
                else{    
                    res.send(examples);
                }
            });

}

function obtenerArticleById (req, res){

    if(req.params.id){
        Article.findOne({"_id": req.params.id}, function(err, example){
            if(err) res.status(500).send("Error al obtener el Articulo");
            else{
                res.send(example);
            }
        });
    }
    else{
        res.status(500).send({message: "Faltan parametros: [:id]"})
    }

}

function obtenerArticlesByTag (req, res){

    if(req.params.tag){
        let my_tag = req.params.tag
        Article.findByTag( my_tag, function(err, articles){
            if(err) res.status(500).send("Error al obtener el Articulo");
            else{
                res.send(articles);
            }
        });
    }
    else{
        res.status(500).send({message: "Faltan parametros: [:tag]"})
    }

}

function getTags (req, res){

    Article.aggregate([
            {$project: {"_id":0, "tags":1} },
            {$unwind: "$tags"},
            {$group: {_id:"$tags"} },
            {$sort: {_id:1} }
        ])
    .exec(function(err, tags){
            if(err) res.status(500).send("Error al obtener los tags");
            else{
                res.send(tags);
            }
        });

}

function getArchivoBlog (req, res){

    Article.aggregate([
            {$project: {"_id":0, "title":1, "description":1, "link":1, "date":1} },
            {$sort: {"date.year":-1, "date.month":-1, "date.day":-1} },
            {$group: {
                _id: "$date.year", 
                articles: { 
                    $push: {
                        date: "$date",
                        title: "$title",
                        description: "$description",
                        link: "$link",
                        }
                    } 
                } 
            },
            {$sort: {"_id.year":-1} }
            ])
    .exec(function(err, archivo){
            if(err) res.status(500).send("Error al obtener el archivo");
            else{
                res.send(archivo);
            }
        });

}

module.exports = {
    obtenerArticles,
    obtenerArticleById,
    obtenerArticlesByTag,
    getTags,
    getArchivoBlog
}