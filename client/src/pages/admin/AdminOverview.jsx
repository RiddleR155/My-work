import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import StatCard from '../../components/admin/StatCard';
import { Skeleton } from '../../components/ui/Skeleton';
import { formatPrice } from '../../utils/format';
import { fetchDashboardStats } from '../../services/adminService';

const statusColors = {
  Pending: 'bg-amber-100 text-amber-800',
  Confirmed: 'bg-blue-100 text-blue-800',
  Processing: 'bg-indigo-100 text-indigo-800',
  Shipped: 'bg-purple-100 text-purple-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={DollarSign} label="Total Revenue" value={formatPrice(stats.totalRevenue)} />
        <StatCard icon={ShoppingCart} label="Total Orders" value={stats.totalOrders} />
        <StatCard icon={Users} label="Total Customers" value={stats.totalCustomers} />
        <StatCard icon={Package} label="Total Products" value={stats.totalProducts} />
      </div>

      <div className="bg-white border border-charcoal-900/10 rounded">
        <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal-900/10">
          <h2 className="font-display text-lg text-charcoal-900">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm text-leather-800 hover:text-gold-600">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-charcoal-700/60 border-b border-charcoal-900/10">
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order._id} className="border-b border-charcoal-900/5 last:border-0">
                  <td className="px-6 py-4 font-mono text-xs text-charcoal-700/80">{order._id.slice(-8)}</td>
                  <td className="px-6 py-4 text-charcoal-900">{order.user?.name}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[order.orderStatus]}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-charcoal-900">{formatPrice(order.totalPrice)}</td>
                </tr>
              ))}
              {stats.recentOrders.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-charcoal-700/50">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-charcoal-900/10 rounded p-6">
        <h2 className="font-display text-lg text-charcoal-900 mb-4">Order Status Breakdown</h2>
        <div className="flex flex-wrap gap-3">
          {Object.entries(stats.statusBreakdown).map(([status, count]) => (
            <span key={status} className={`text-sm px-4 py-2 rounded-full font-medium ${statusColors[status]}`}>
              {status}: {count}
            </span>
          ))}
          {Object.keys(stats.statusBreakdown).length === 0 && (
            <p className="text-sm text-charcoal-700/50">No order data yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
