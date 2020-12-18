const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile)

function readNotes() {
    //Read the json file for data
    fs.readFile("db.json", "utf8", function (err, data) {
        if (err) {
           throw err;
       }

       //parse JSON string to an object
       const dbJSON = JSON.parse(data);

       //create an array for objects
       const Notes = [];

       //for each note, push it into the Notes array
       dbJSON.forEach(function (note) {
           Notes.push(note);
       })

       //Make those notes display
       showNotes(Notes)
   });
}

function saveNotes() {
    
}

function showNotes(data) {
    return `
    <ul>${data.title}</ul>
    `
}
