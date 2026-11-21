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
