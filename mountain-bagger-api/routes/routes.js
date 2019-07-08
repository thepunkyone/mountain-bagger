const express = require('express');
const routeController = require('../controllers/routes');

const router = express.Router();

router.post('/:userId/save-route', routeController.saveRoute);
router.get('/:userId', routeController.listRoutes);

module.exports = router;