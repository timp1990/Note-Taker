const notesRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

const notesDatabasePath = './db/db.json'

// Setup the api/notes get route to send existing notes for rendering
notesRouter.get('/', (req, res) => {
  readFromFile(notesDatabasePath).then((data) => res.json(JSON.parse(data)))
})

// Setup the api/notes post route to store a new note

notesRouter.post('/', (req, res) => {
  // Extract the data from the request object
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    // Write the new note to the file db.json
    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newFeedback,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
})

notesRouter.delete('/:id', (req, res) => {
  const noteForDeletingID = req.params.id.toLowerCase();
  readFromFile(notesDatabasePath).then((data) => {
    const thisData = JSON.parse(data)
    // Filter db list
    const forWritingData = thisData.filter(item => item.id !== noteForDeletingID)
    writeToFile(notesDatabasePath, forWritingData)
  })
})

module.exports = notesRouter;
