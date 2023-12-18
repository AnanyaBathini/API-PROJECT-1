const books=[
    {
        ISBN:"123456B",
        title:"Tesla",
        pubDate:"2021-08-14",
        language:"en",
        numpages:"109",
        author:[1,2],
        publications:[1],
        category:["tech","space","education"]

    }


];
const author=[
    {
        id:"1",
        name:"Ananya",
        books:["123456B","book2"]
    },
    {
        id:"2",
        name:"Elon Musk",
        books:["123456B"]
    }
];
const publication=[
    {
        id:"1",
        name:"Writex",
        books:["123456B"]
    }       
];
module.exports={books,author,publication};