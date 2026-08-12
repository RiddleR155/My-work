import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

// @desc    Get dashboard overview statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalOrders, totalProducts, totalCustomers, orders, recentOrders] = await Promise.all([
    Order.countDocuments(),
    Product.countDocuments(),
    User.countDocuments({ role: 'customer' }),
    Order.find({ orderStatus: { $ne: 'Cancelled' } }),
    Order.find().populate('user', 'name email').sort({ createdAt: -1 }).limit(5),
  ]);

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  const statusBreakdown = orders.reduce((acc, order) => {
    acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
    return acc;
  }, {});

  res.json({
    totalRevenue,
    totalOrders,
    totalCustomers,
    totalProducts,
    statusBreakdown,
    recentOrders,
  });
});
