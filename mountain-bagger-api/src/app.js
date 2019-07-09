const express = require('express');
const cors = require('cors');
const { create, getUser, getUserById, listUsers } = require('./controllers/users');
const routeRouter = require('./routes/routes');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/user', routeRouter);

app.post('/login', getUser);
app.post('/user', create);
app.get('/users', listUsers);


app.get('/point', (req, res) => {
  res.status(200).json({ message: 'Point get status 200' });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Root get status 200' });
});

app.post('/point', (req, res) => {
  res.status(200).json({ message: 'Point post status 200' });
});

app.post('/route', )

module.exports = app;
