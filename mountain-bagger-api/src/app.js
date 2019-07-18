const express = require('express');
const cors = require('cors');
// const { createUser, getUser, getUserById, listUsers } = require('./controllers/users');
const userRouter = require('./routes/users');
const routeRouter = require('./routes/routes');
const mapRouter = require('./routes/map');
const authRouter = require('./routes/auth');
const authenticate = require('./middleware/authenticate');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/routes', authenticate, routeRouter);
app.use('/login', authRouter);
app.use('/:userId/maps', authenticate, mapRouter);
app.use('/', userRouter);

module.exports = app;
