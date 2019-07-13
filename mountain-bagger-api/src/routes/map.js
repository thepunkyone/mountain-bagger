const express = require("express");
const mapRouter = express.Router({mergeParams: true});

const { postMap, deleteMap, getMaps } = require('../controllers/map');

mapRouter.post('/', postMap);
mapRouter.delete('/:mapId', deleteMap);
mapRouter.get('/', getMaps);


module.exports = mapRouter;

