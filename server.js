//Imports=========================================

var express = require("express");
var path = require("path");
var fs = require("fs");
var Notes = require("./db/notes.js");
var db = require("./db/db.json");

//=================================================

var app = express();
var PORT = 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//Data===============================================

//var Notes = [];
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
    return res.json(Notes);
    
});

//create new note

app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    console.log(newNote);
    db.push(newNote);
    res.json(newNote);
});

app.delete("/api/notes/:id", function (req, res) {
    var currentNote = req.params.id;
    console.log(currentNote);
})


//Start=Server========================================

app.listen(PORT, function () {
    console.log("it's running on PORT" + PORT);
});