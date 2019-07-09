const express = require("express");
const mapRouter = express.Router();

const { postMap, getMap } = require('../controllers/map');

mapRouter.post('/', postMap);
mapRouter.get('/', getMap);


module.exports = mapRouter;

