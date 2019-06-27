const express = require('express');

const app = express();

app.get('/user', (req, res) => {
  res.status(200).json({ message: 'User get status 200' });
});

app.get('/point', (req, res) => {
  res.status(200).json({ message: 'Point get status 200' });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Root get status 200' });
});

app.post('/user', (req, res) => {
  res.status(200).json({ message: 'User post status 200' });
});

app.post('/point', (req, res) => {
  res.status(200).json({ message: 'Point post status 200' });
});

app.listen(3030, () => console.log(`Example app listening on port ${3030}!`))

module.exports = app;