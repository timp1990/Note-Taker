const notesRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes db
notesRouter.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting db
notesRouter.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newdb = {
      title,
      text,
      db_id: uuidv4(),
    };

    readAndAppend(newdb, './db/db.json');

    const response = {
      status: 'success',
      body: newdb,
    };

    res.json(response);
  } else {
    res.json('Error in posting db');
  }
});

module.exports = notesRouter;
