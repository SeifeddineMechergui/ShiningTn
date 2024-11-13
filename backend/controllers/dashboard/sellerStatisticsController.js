const customerOrderModel = require('../../models/customerOrder');
const sellerModel = require('../../models/sellerModel');
const adminGivingsModel = require('../../models/AdminGivings'); // Import the admin givings model
const { responseReturn } = require('../../utiles/response');
const { mongo: { ObjectId } } = require('mongoose');

class SellerStatisticsController {
    // Method to get all seller statistics
    async getAllSellerStatistics(req, res) {
        try {
            console.log("Fetching customer orders...");

            // Fetch all customer orders
            const orders = await customerOrderModel.find({});
            console.log("Orders fetched:", orders);

            const sellerStatsMap = new Map();

            // Iterate through orders
            for (const order of orders) {
                if (order.delivery_status === "placed") {
                    console.log(`Processing order ID: ${order._id}`);

                    // Iterate through products in each order
                    for (const product of order.products) {
                        const sellerId = product.sellerId; // Get seller ID from product

                        // Access quantity and price directly from product
                        const quantitySold = product.quantity || 0; 
                        const productPrice = product.price || 0;

                        console.log(`Processing product ID: ${product._id} for seller ID: ${sellerId} | Quantity Sold: ${quantitySold} | Product Price: ${productPrice}`);

                        // Initialize seller stats if not already present
                        if (!sellerStatsMap.has(sellerId)) {
                            sellerStatsMap.set(sellerId, {
                                sellerId: sellerId,
                                totalSold: 0,
                                totalRevenue: 0,
                                adminGiven: 0, // Initialize admin given amount
                            });
                        }

                        // Update seller stats
                        const sellerStats = sellerStatsMap.get(sellerId);
                        sellerStats.totalSold += quantitySold; // Increment total sold
                        sellerStats.totalRevenue += quantitySold * productPrice; // Calculate and increment revenue

                        console.log(`Updated stats for seller ${sellerId}:`, sellerStats);
                    }
                }
            }

            // Fetch seller names
            const sellerIds = Array.from(sellerStatsMap.keys());
            const sellers = await sellerModel.find({ _id: { $in: sellerIds } });

            const sellerMap = new Map();
            sellers.forEach(seller => {
                sellerMap.set(seller._id.toString(), seller.name); // Adjust according to your seller model
            });

            // Fetch admin givings for each seller
            const adminGivings = await adminGivingsModel.find({ sellerId: { $in: sellerIds } });
            const givingsMap = new Map();
            adminGivings.forEach(giving => {
                givingsMap.set(giving.sellerId.toString(), giving.amount); // Assuming 'amount' is the field name
            });

            // Add seller names and admin given amounts to statistics
            const statistics = Array.from(sellerStatsMap.values()).map(stat => ({
                ...stat,
                sellerName: sellerMap.get(stat.sellerId.toString()) || 'Unknown', // Default to 'Unknown' if not found
                adminGiven: givingsMap.get(stat.sellerId.toString()) || 0, // Default to 0 if not found
            }));

            console.log("Final statistics:", statistics);
            responseReturn(res, 200, { statistics });
        } catch (error) {
            console.error('Error fetching seller statistics:', error.message);
            responseReturn(res, 500, { message: 'Internal server error' });
        }
    }

    // Method to update admin giving for a seller
    async updateAdminGiving(req, res) {
        const { sellerId, amount } = req.body;

        try {
            // Validate the amount to be positive
            if (!sellerId || !amount || amount <= 0) {
                return responseReturn(res, 400, { message: 'Invalid amount. Amount must be greater than 0.' });
            }

            const seller = await sellerModel.findById(sellerId);
            if (!seller) {
                return responseReturn(res, 404, { message: 'Seller not found' });
            }

            // Find or create the admin giving record
            let adminGiving = await adminGivingsModel.findOne({ sellerId });
            if (adminGiving) {
                // Update existing admin giving record
                adminGiving.amount += amount;
                await adminGiving.save();
            } else {
                // Create a new admin giving record
                adminGiving = new adminGivingsModel({
                    sellerId,
                    amount,
                });
                await adminGiving.save();
            }

            return responseReturn(res, 200, { message: 'Admin giving updated successfully' });
        } catch (error) {
            console.error('Error updating admin giving:', error.message);
            return responseReturn(res, 500, { message: 'Internal server error' });
        }
    }
}

module.exports = new SellerStatisticsController();
