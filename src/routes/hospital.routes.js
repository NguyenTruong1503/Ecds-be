const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospital.controller');

router.get('/region/:regionId', hospitalController.getHospitalsByRegion);
router.post('/', hospitalController.createHospital);
router.get('/', hospitalController.getAllHospitals);

module.exports = router;
