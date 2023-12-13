const express = require('express');
const path = require('path');

const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// http://localhost:3001/api
// this is the modular route
app.use('/api', api);

app.use(express.static('public'));

// http://localhost:3001/notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to direct users to a index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
