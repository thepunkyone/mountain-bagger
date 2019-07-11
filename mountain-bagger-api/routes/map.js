const express = require("express");
const mapRouter = express.Router({mergeParams: true});

const { postMap, getMaps } = require('../controllers/map');

mapRouter.post('/', postMap);
mapRouter.get('/', getMaps);


module.exports = mapRouter;

