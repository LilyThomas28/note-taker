const express = require("express");
const path = require('path');
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));

// GET Route for notes(notes.html) page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Wildcard route to direct users to a main(index.html) page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

 // connects and sends a request to db.json
app.post('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

// creating post request that takes JSON input, "title" "text" and adds a new note object to the db.json file
app.post("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error, response) => {
        if (error) {
            console.log(error);
        }
        const note = JSON.parse(response);
        const noteReq = req.body;
        const newNoteID = note.length + 1;
        const newNote = {
            id: newNoteID,
            title: noteReq.title,
            text: noteReq.text
        };
        notes.push(newNote);
        res.json(newNote);
        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(note, null, 2), (err) => {
            if (err) throw err;
        });
    });
});

// create listener to start the server
app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`);
})