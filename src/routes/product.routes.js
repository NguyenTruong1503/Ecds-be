const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/hospital/:hospitalId', productController.getProductsByHospital);
router.post('/', productController.createProduct);
router.get('/companies', productController.getListAllCompanies);
router.get('/search', productController.searchProducts);

module.exports = router;
