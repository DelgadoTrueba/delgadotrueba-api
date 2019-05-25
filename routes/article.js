"use strict"

var express = require("express"),
    api = express.Router(),
    ArticleController = require("../controllers/article");


api.get("/tags", ArticleController.getTags);
api.get("/archivo", ArticleController.getArchivoBlog);

api.get("/articles", ArticleController.obtenerArticles);
api.get("/articles/:id", ArticleController.obtenerArticleById);
api.get("/articles/findBy/:tag", ArticleController.obtenerArticlesByTag);

module.exports  = api;