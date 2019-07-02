const express = require('express');
const { createUser, getUser } = require('../controllers/users');

const app = express();
app.use(express.json());

app.get('/user', getUser);

app.post('/user', createUser);

app.get('/point', (req, res) => {
  res.status(200).json({ message: 'Point get status 200' });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Root get status 200' });
});

app.post('/point', (req, res) => {
  res.status(200).json({ message: 'Point post status 200' });
});

app.listen(3030, () => console.log(`Example app listening on port ${3030}!`))

module.exports = app;