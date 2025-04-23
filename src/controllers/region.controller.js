const Region = require('../models/region.model');

exports.getAllRegions = async (req, res) => {
  const regions = await Region.find();
  res.json(regions);
};

exports.createRegion = async (req, res) => {
  const region = new Region(req.body);
  await region.save();
  res.status(201).json(region);
};

exports.getRegionById = async (req, res) => {
  const region = await Region.findById(req.params.regionId);
  if (!region) {
    return res.status(404).json({ message: 'Region not found' });
  }
  res.json(region);
};
