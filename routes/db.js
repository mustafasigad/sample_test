const notesDB = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET Route for retrieving all the Notes
notesDB.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
// GET route for retriving individual notes http://localhost:3001/api/notes/:id
notesDB.get('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((db) => db.id == noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No ID with that ID');
    });
});
// DELETE Route for a specific ID api/routes/:id
notesDB.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((db) => db.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);

    });
});

// POST Route for a new UX/UI db
// http:localhost:3001/api/notes
notesDB.post('/', (req, res) => {
  const { title, text } = req.body;
  if (req.body) {
    const newNotes = {
      title,
      text,
      id: uuidv4(),
    };
    readAndAppend(newNotes, './db/db.json');
    res.json(`New notes added successfully`);
  } else {
    res.error('Error in adding new notes');
  }
});
module.exports = notesDB;
