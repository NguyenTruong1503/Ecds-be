const express = require('express');
const router = express.Router();
const regionController = require('../controllers/region.controller');

router.get('/', regionController.getAllRegions);
router.post('/', regionController.createRegion);
router.get('/:regionId', regionController.getRegionById);

module.exports = router;
