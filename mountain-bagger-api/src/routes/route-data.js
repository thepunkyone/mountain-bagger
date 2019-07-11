const express = require("express");
const routeDataRouter = express.Router({mergeParams: true});

const { getRouteData } = require('../controllers/route-data');

routeDataRouter.get('/', getRouteData);


module.exports = routeDataRouter;