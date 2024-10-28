const express = require('express');
const router = express.Router();
const sellerStatisticsController = require('../controllers/sellerStatisticsController');

// Get statistics for all sellers
router.get('/admin/seller/statistics', sellerStatisticsController.getAllSellerStatistics);
app.post('/admin/seller/give', sellerStatisticsController.updateAdminGiving);

module.exports = router;
