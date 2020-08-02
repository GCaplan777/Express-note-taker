// Dependencie===========
var express = require("express");
var path = require("path");
var fs = require("fs");
const { v4: uuid } = require("uuid");

// Sets up the Express App=======
var app = express();
//set up dynamic port for HEROKU
var PORT = process.env.PORT || 3000;

// // Sets up the Express app to handle data parsing========================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTLM ROUTES

// //   * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// //   * GET for index.html` file (though README requests '*' Heroku requires "/" homepage so I went with this)
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function (req, res) {
  let rawdata = fs.readFileSync("db/db.json");
  let db = JSON.parse(rawdata);
  console.log(db);
  return res.json(db);
});

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

app.post("/api/notes", function (req, res) {
  let rawdata = fs.readFileSync("db/db.json");
  let db = JSON.parse(rawdata);
  var newNote = req.body;
  newNote.id = uuid();
  console.log(newNote);
  db.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(db));
  return res.json(newNote);
});

//   * DELETE

app.delete("/api/notes/:id", function (req, res) {
  let rawdata = fs.readFileSync("db/db.json");
  let db = JSON.parse(rawdata);
  var deletedPost = req.params.id;
  var newNoteArray = db.filter((note) => note.id !== deletedPost);
  fs.writeFileSync("db/db.json", JSON.stringify(newNoteArray));
  return res.json(newNoteArray);
});

// Starts the server to begin listening====================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
