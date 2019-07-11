const express = require('express');
const cors = require('cors');
const { createUser, getUser, getUserById, listUsers } = require('./controllers/users');
const routeRouter = require('./routes/routes');
const mapRouter = require('./routes/map');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/user', routeRouter);

app.post('/login', getUser);
app.get('/users', listUsers);

app.post('/user', createUser);

app.use('/:userId/maps', mapRouter);

module.exports = app;
