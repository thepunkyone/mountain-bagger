const express = require('express');
const cors = require('cors');
const { createUser, getUser, getUserById, listUsers } = require('./controllers/users');
const routeRouter = require('./routes/routes');
const mapRouter = require('../routes/map');
const routeDataRouter = require('../routes/route-data');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/user', routeRouter);

app.post('/login', getUser);
app.get('/users', listUsers);

app.post('/user', createUser);

app.use('/:userId/maps', mapRouter);

app.use('/:userId/route-data', routeDataRouter);


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
