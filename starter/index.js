const express = require("express");
const path = require('path');
const fs = require("fs");
app.use(express.json());

const app = express();

// GET Route for notes(notes.html) page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// Wildcard route to direct users to a main(index.html) page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);