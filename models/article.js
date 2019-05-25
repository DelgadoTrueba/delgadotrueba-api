const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: String,
    description: String,
    link: String,
    photo: String,
    date: {
        year: { type: Number },
        month: { type: Number },
        day: { type: Number }
    },
    tags: [String]
});


articleSchema.statics.findByTag = function(tag, callback){

    this.find({ tags: tag }, {"_id":0}).sort({"date.year":-1, "date.month":-1, "date.day":-1}).limit(9)
        .exec(
            function(err, articles){
                if(err){
                    var my_err = {};
                    my_err.message = "Error al buscar el article";
                    callback(my_err);
                }
                else{
                    callback(null, articles); //ok
                }
            });

}

module.exports = mongoose.model("articles", articleSchema);