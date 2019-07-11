const express = require('express');
const routeController = require('../controllers/routes');

const router = express.Router();

router.post('/:userId/save-route', routeController.saveRoute);
router.get('/:userId', routeController.listRoutes);
router.get('/:userId/:routeId', routeController.findRoute);
router.get('/', routeController.status);
module.exports = router;
