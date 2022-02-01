const express = require("express");
const path = require('path');
const fs = require("fs");
const db = require('./db/db.json');
const uniqid = require('uniqid');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));

// connects and sends a request to db.json
app.post('/api/notes', (req, res) => {
   res.status(200).json(db);
});

// GET Route for notes(notes.html) page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});



// creating post request that takes JSON input, "title" "text" and adds a new note object to the db.json file
app.post("/api/notes", (req, res) => {
    const {title, text, id} = req.body;
    if (title && text) {
        let response = {title, text, id: uniqid()};
        db.push(response);
        fs.writeFile('./db/db.json', JSON.parse(db), (err) => {
            err ? console.log(err) : console.log("Note added")
        });
        res.send("Note added");
    } else {
        res.status(400).json('Not working');
    }
});

// Wildcard route to direct users to a main(index.html) page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// create listener to start the server
app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`);
})