const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

//router.post('/login', userController.getUser);
router.get('/users', userController.listUsers);
router.post('/user', userController.create);

module.exports = router;
