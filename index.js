//book management project

const express=require("express");
//Database
const database=require("./database");
//initialising express
const bookie=express();
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

bookie.listen(3000,()=>{
    console.log("Server is up and running");
});