const express = require('express');
const sellerStatisticsController = require('../../controllers/dashboard/sellerStatisticsController');
const router = express.Router();

// Get statistics for all sellers
router.get('/admin/seller/statistics', sellerStatisticsController.getAllSellerStatistics);


module.exports = router;
