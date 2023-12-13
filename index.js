//book management project
require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
//importing body parser module for post request
var bodyParser=require("body-parser");
//Database
const database=require("./database");
//initialising express
const bookie=express();
bookie.use(bodyParser.urlencoded({extened:true}));
bookie.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
}).then
(()=>console.log("connection has been established"));
/*
Route         /
Description   get all the books
Acess         PUBLIC
parameter     NONE
methods used  GET
*/
bookie.get("/",(req,res)=>{
    return res.json({books: database.books});
});

/* 
Route         /is
Description   get specific book
Acess         PUBLIC
parameter     isbn
methods used  GET
*/
bookie.get("/is/:isbn",(req,res)=>{
    const getSpecificBook=database.books.filter(
        (book) => book.ISBN===req.params.isbn
    );
    if(getSpecificBook.length===0){
        return res.json({error :`no book found for the ISBN of ${req.params.isbn}`});
    }
    return res.json({book: getSpecificBook});
});
/* 
Route         /c
Description   get books based on category
Acess         PUBLIC
parameter     category
methods used  GET
*/

bookie.get("/c/:category",(req,res)=>{
    const getSpecificBook=database.books.filter(
        (book)=>book.category.includes(req.params.category)
    );
    if(getSpecificBook.length===0){
        return res.json({error:`No book found for the category of ${req.params.category}`});
    }
    return res.json({"book":getSpecificBook});
});
/* 
Route         /l
Description   get books based on languages
Acess         PUBLIC
parameter     language
methods used  GET
*/
bookie.get("/l/:language",(req,res)=>{
    const getSpecificBook=database.books.filter(
        (book)=>book.language.includes(req.params.language)
    );
    if(getSpecificBook.length===0){
    return res.json({"error":`No book found for ${req.params.language}`});
    }
    return res.json({"book":getSpecificBook});
});
/* 
Route         /author
Description   get all the authors
Acess         PUBLIC
parameter     NONE
methods used  GET
*/
bookie.get("/author",(req,res)=>{
    return res.json({"authors":database.author});
});

/* 
Route         /i
Description   get specific author based on id
Acess         PUBLIC
parameter     id
methods used  GET
*/
bookie.get("/i/:id",(req,res)=>{
    const getSpecificAuthor=database.author.filter(
        (a) => a.id===req.params.id
    );
    if(getSpecificAuthor.length===0){
        return res.json({error :`no author with the id of ${req.params.id}`});
    }
    return res.json({book: getSpecificAuthor});
});
/* 
Route         /author
Description   get specific author based on isbn number of the book
Acess         PUBLIC
parameter     isbn
methods used  GET
*/
bookie.get("/author/book/:isbn",(req,res)=>{
    const getSpecificAuthor=database.author.filter(
        (a)=> a.books.includes(req.params.isbn)
        );
    if(getSpecificAuthor.length===0){
        return res.json({"error":`no author found for the book of ${req.params.isbn}`});
    }
    return res.json({"authors":getSpecificAuthor});
    
});
/* 
Route         /p
Description   get all the publications
Acess         PUBLIC
parameter     NONE
methods used  GET
*/
bookie.get("/p",(req,res)=>{
    return res.json({"publications":database.publication});
});

/* 
Route         /pid
Description   get specific publication based on id
Acess         PUBLIC
parameter     id
methods used  GET
*/
bookie.get("/pid/:id",(req,res)=>{
    const getSpecificPublication=database.publication.filter(
        (a) => a.id===req.params.id
    );
    if(getSpecificPublication.length===0){
        return res.json({error :`no publication with the id of ${req.params.id}`});
    }
    return res.json({Publications: getSpecificPublication});
});
/* 
Route         /pub
Description   get specific author based on isbn number of the book
Acess         PUBLIC
parameter     isbn
methods used  GET
*/
bookie.get("/pub/:isbn",(req,res)=>{
    const getSpecificPublication=database.publication.filter(
        (a)=> a.books.includes(req.params.isbn)
        );
    if(getSpecificPublication.length===0){
        return res.json({"error":`no Publications found for the book of ${req.params.isbn}`});
    }
    return res.json({"Publications":getSpecificPublication});
    
});

/*
Route         /book/new
Description   add new books
Acess         PUBLIC
parameter     NONE
methods used  POST
*/

bookie.post("/book/new",(req,res)=>{
    const newBook=req.body;
    database.books.push(newBook);
    return res.json({updatedBooks:database.books});
});
/*
Route         /author/new
Description   add new authors
Acess         PUBLIC
parameter     NONE
methods used  POST
*/
bookie.post("/author/new",(req,res)=>{
    const newAuthor=req.body;
    database.author.push(newAuthor);
    return res.json({updatedAuthors:database.author});
});

/*
Route         /publication/new
Description   add new publications
Acess         PUBLIC
parameter     NONE
methods used  POST
*/
bookie.post("/publication/new",(req,res)=>{
    const newPublication=req.body;
    database.publication.push(newPublication);
    return res.json({updatedPublications:database.publication});
});

/*
Route         /publication/update/book
Description   update or add new publications
Acess         PUBLIC
parameter     isbn
methods used  PUT
*/
bookie.put("/publication/update/book/:isbn",(res,req)=>{
//update the publication database
    database.publication.forEach((pub)=>{
        if(pub.id===req.params.pubid){
            return pub.books.push(req.params.isbn);
        }
    });
    //update the book databse
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            book.publications=book.body.pubid;
            return;
        }
    });
    return res.json({
        books:database.books,
        publications:database.publication,
        message:"Successfully updated publications"
    });
});
/*
Route         /book/delete
Description   delete a book
Acess         PUBLIC
parameter     isbn
methods used  DELETE
*/
bookie.delete("/book/delete/:isbn",(res,req)=>{
    //whichever book doesnt match with the isbn send it to updated book databse array
    //and rest will be filtered out
    const updatedBookDatabase=database.books.filter(
        (book)=>book.ISBN!=req.params.isbn
    )
    database.books=updatedBookDatabase;
    return res.json({books:database.books});
});
/*
Route         /book/author/delete
Description   delete author from book
Acess         PUBLIC
parameter     isbn
methods used  DELETE
*/
bookie.delete("/book/author/delete/:isbn",(res,req)=>{
   
    const updatedBookDatabase=database.author.filter(
        (author)=>author.books.ISBN!=req.params.isbn
    )
    database.author=updatedBookDatabase;
    return res.json({Authors:database.author});
});

//multiple parameters
/*
Route         /book/delete/author
Description  delete author from book and related book from author
Acess         PUBLIC
parameter     isbn,authorId
methods used  DELETE
*/

bookie.delete("/book/delete/author/:isdn/:authorId",(req,res)=>{
//update the book database
    database.books.forEach((book)=>{
        if(book.isbn===req.params.isbn){
            const newAuthorList=book.author.filter(
                (author1)=>author1!=parseInt(req.params.authorId)
            );
            book.author=newAuthorList;
            return;
        }
    });

//update author database
    database.author.forEach((eachAuthor)=>
    {
        if(eachAuthor.id===parseInt(req.params.authorId)){
            const newBookList=eachAuthor.books.filter(
                (book)=>book!=req.params.isbn
                );
                eachAuthor.books=newBookList;
                return;
        }

    });
    return res.json({
        book:database.books,
        author:database.author,
        message:"Author was called"
    });
});


bookie.listen(3000,()=>{
    console.log("Server is up and running");
});