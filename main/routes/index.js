const router = require('express').Router();

// Import our modular routers for /notes
const notesRouter = require('./db');

// http://localhost:3001/api/notes
router.use('/notes', notesRouter);
module.exports = router;

