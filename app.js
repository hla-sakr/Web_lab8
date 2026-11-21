// // const names= require( './names.js')
// // const functions= require( './functions.js')

// // console.log("Hello, World!");


// // // console.log(__dirname);
// // // console.log(__filename);
// // //console.log(module);
// // functions.sayHi(names.name1);
// // functions.sayHi(names.name2);
// //used to create a server
// const http= require('http');

// function processincomingrequest(req, res) {
//     if (req.url === "/") {    res.end("welcome to my homepage");
//     } else if (req.url === "/settings") {
//         res.end("Hello, welcome to settings page");
//     } else {
//         res.end("Page not found");
//     }

//     console.log ("incoming req");
//     console.log(req.url);
// }

// const server=  http.createServer((req, res) => {
//     processincomingrequest(req, res);
// });

// server.listen(5000, () => {
//     console.log("Server listening on port 5000");
// })  

const express= require('express');
const app= express();
app.use(express.json());
const books = [
    { id: 1, title: "book1", author: "Author 1" },
    { id: 2, title: "book2", author: "Author 2" },
    { id: 3, title: "book3", author: "Author 3" }
];


app.get ("/books", (req, res) => { 
   // console.log(books);
    res.json(books);
}
);

//:id is a route parameter.
//parseInt To convert "2" into the number 2.
app.get ("/books/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
}
);

app.post ("/books", (req, res) => {
    const { title, author } = req.body;
    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
}
);

app.delete ("/books/:id", (req, res) => {
    const deletedbook = books.find(b => b.id === parseInt(req.params.id));
    if (!deletedbook) {
        return res.status(404).json({ error: "Book not found" });
    }
}
);


app.listen(5000, () => {
    console.log("Server listening on port 5000");
})