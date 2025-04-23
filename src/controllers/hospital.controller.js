const Hospital = require('../models/hospital.model');

exports.getHospitalsByRegion = async (req, res) => {
  const hospitals = await Hospital.find({ regionId: req.params.regionId })
  .populate('regionId', 'name');
  res.json(hospitals);
};

exports.getAllHospitals = async (req, res) => {
  const hospitals = await Hospital.find();
  res.json(hospitals);
}


exports.createHospital = async (req, res) => {
    try {
      if (Array.isArray(req.body)) {
        const hospitals = await Hospital.insertMany(req.body);
        return res.status(201).json(hospitals);
      } else {
        const hospital = new Hospital(req.body);
        await hospital.save();
        return res.status(201).json(hospital);
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  };
  
