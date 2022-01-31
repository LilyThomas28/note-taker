const express = require("express");
const path = require('path');
const fs = require("fs");
const { brotliDecompress } = require("zlib");

const PORT = procces.env.PORT || 3001;

const app = express();
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

 // connects and sends a request to brotliDecompress.json
app.post('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "db.json"));
})