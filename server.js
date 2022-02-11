const fs = require("fs");
const express = require("express");
const path = require('path');
const db = require('./db/db.json');
const uniqid = require('uniqid');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));

// connects and sends a request to db.json
app.get('/api/notes', (req, res) => {
   res.json(db);
});

// GET Route for notes(notes.html) page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});


// Wildcard route to direct users to a main(index.html) page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// creating post request that takes JSON input, "title" "text" and adds a new note object to the db.json file
app.post("/api/notes", (req, res) => {
    const {title, text, id} = req.body;
    if (title && text) {
        const response = {title, text, id: uniqid()};
        db.push(response);
        fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
            err ? console.error(err) : console.log("Note added")
        });
        res.send("Note added");
    } else {
        res.status(400).json('Not working');
    }
});


// create listener to start the server
app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`);
})