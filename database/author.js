const mongoose=require("mongoose");
const { books } = require("./database");
//create book schema
const AuthorSchema=mongoose.Schema(
    {
        id:Number,
        name:String,
        books:[String]
    }
);

const AuthorModel=mongoose.model("authors",AuthorSchema);
module.exports=(AuthorModel);