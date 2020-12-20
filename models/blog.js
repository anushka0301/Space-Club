var mongoose=require("mongoose");

var blogSchema=new mongoose.Schema({
    name: String,
    image: String,
    body: String,
    author: String
});

module.exports=mongoose.model("Blog", blogSchema);
