const express = require('express');
const cors = require('cors');
const { createUser, getUser } = require('./controllers/user');
const mapRouter = require('./routes/map');
const routeDataRouter = require('./routes/route-data');

const app = express();
app.use(cors());
app.use(express.json());


app.post('/login', getUser);
app.post('/user', createUser);

app.use('/:userId/maps', mapRouter);

app.use('/:userId/route-data', routeDataRouter);

module.exports = app;