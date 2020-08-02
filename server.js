// // Create an application that can be used to write, save, and delete notes. This application will use an express backend and save and retrieve note data from a JSON file.

// Dependencie===========
var express = require("express");
var path = require("path");

// Sets up the Express App=======
var app = express();
//set up dynamic port for HEROKU
var PORT = process.env.PORT || 3000;

// // Sets up the Express app to handle data parsing========================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//OBJECT ARRAY TO STORE DATA=========
var reservations = [
  {
    routeName: "tk",
    name: "tk",
  },
];

//SETUP ROUTES
// // * The following HTML routes should be created:

// //   * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "develop/public/notes.html"));
});

// //   * GET `*` - Should return the `index.html` file
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.

// * The following API routes should be created:

//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

//reservations === GET/reservation html then POST

//SETUP LISTENER ON SERVER
// Starts the server to begin listening====================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
