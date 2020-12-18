//Imports=========================================

var express = require("express");
var path = require("path");
var fs = require("fs");
//var Notes = require("./db/notes.js");
var db = require("./db/db.json");
const { v4: uuidv4 } = require('uuid');

//=================================================

var app = express();
var PORT = 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));

//Data===============================================

const Notes = [];
//this might need to be moved to db.json

//Routes=============================================

//HTML ROUTES
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//API ROUTES
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname + "/db/db.json"));
    
});

//Create New Note
//this takes in JSON input
app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    console.log(newNote);
    newNote.id = uuidv4();
    Notes.push(newNote);
    //console.log(Notes);
    const saveNotes = JSON.stringify(Notes);
    res.json(saveNotes);
    fs.writeFileSync(__dirname + "/db/db.json", saveNotes);
});

app.delete("/api/notes/:id", function (req, res) {
    var currentNote = req.params.id;
    console.log(currentNote);
    db = db.filter(newNote => newNote.id !=req.params.id);
    console.log(db);
    const update = JSON.stringify(db);
    res.json(update);
    fs.writeFileSync(__dirname + "/db/db.json", update);

})


//Start=Server========================================

app.listen(PORT, function () {
    console.log("it's running on PORT" + PORT);
});