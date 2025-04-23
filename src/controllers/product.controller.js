const mongoose = require('mongoose');
const Product = require('../models/product.model');
const Hospital = require('../models/hospital.model');
const Agent = require('../models/agent.model');
const Region = require('../models/region.model');

exports.getProductsByHospital = async (req, res) => {
  try {
    const products = await Product.find({ hospitalId: req.params.hospitalId })
    .populate('hospitalId', 'name')
    .populate('agentId', 'name avatar')

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getListAllCompanies = async (req, res) => {
  try {
    const companies = await Product.distinct('company');
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// controllers/product.controller.ts

exports.searchProducts = async (req, res) => {
  try {
    const { keyword, regionId, hospitalId, agentId, status } = req.query;

    const filter = {};

    // Tìm kiếm theo tên hoặc mã sản phẩm
    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { code: { $regex: keyword, $options: 'i' } }
      ];
    }

    // Lọc theo bệnh viện
    if (hospitalId) {
      filter.hospitalId = hospitalId;
    }

    // Nếu chỉ chọn khu vực (chưa chọn bệnh viện)
    if (!hospitalId && regionId) {
      // Tìm tất cả bệnh viện thuộc region đó
      const hospitals = await Hospital.find({ regionId }).select('_id');
      filter.hospitalId = { $in: hospitals.map(h => h._id) };
    }

    if (agentId) {
      filter.agentId = agentId;
    }

    if (status) {
      filter.status = status;
    }

    const products = await Product.find(filter)
    .populate('agentId')
    .populate({
      path: 'hospitalId',
      populate: {
        path: 'regionId' 
      }
    });

    

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi truy vấn sản phẩm' });
  }
};




exports.createProduct = async (req, res) => {
  try {
    const productsData = req.body.map((product) => ({
      ...product,
      agentId: product.agentId ? new mongoose.Types.ObjectId(product.agentId) : null,
      hospitalId: new mongoose.Types.ObjectId(product.hospitalId),
    }));

    const products = await Product.insertMany(productsData);
    res.status(201).json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

  
