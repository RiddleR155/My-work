import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Eye, X } from 'lucide-react';
import { Skeleton } from '../../components/ui/Skeleton';
import Modal from '../../components/ui/Modal';
import { formatPrice } from '../../utils/format';
import { fetchAllOrders, updateOrderStatus } from '../../services/orderService';
import { getErrorMessage } from '../../services/api';

const statuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const statusColors = {
  Pending: 'bg-amber-100 text-amber-800',
  Confirmed: 'bg-blue-100 text-blue-800',
  Processing: 'bg-indigo-100 text-indigo-800',
  Shipped: 'bg-purple-100 text-purple-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [viewOrder, setViewOrder] = useState(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchAllOrders();
      setOrders(data);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, orderStatus) => {
    setUpdatingId(orderId);
    try {
      const updated = await updateOrderStatus(orderId, orderStatus);
      setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, orderStatus: updated.orderStatus } : o)));
      toast.success('Order status updated');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <h1 className="font-display text-xl text-charcoal-900 mb-6">Orders ({orders.length})</h1>

      {loading ? (
        <Skeleton className="h-96" />
      ) : (
        <div className="bg-white border border-charcoal-900/10 rounded overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-charcoal-700/60 border-b border-charcoal-900/10">
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">View</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-charcoal-900/5 last:border-0">
                  <td className="px-6 py-3 font-mono text-xs text-charcoal-700/80">{order._id.slice(-8)}</td>
                  <td className="px-6 py-3 text-charcoal-900">{order.user?.name}</td>
                  <td className="px-6 py-3 text-charcoal-700/70">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 text-charcoal-900">{formatPrice(order.totalPrice)}</td>
                  <td className="px-6 py-3">
                    <select
                      value={order.orderStatus}
                      disabled={updatingId === order._id}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium border-0 focus:outline-none focus:ring-2 focus:ring-gold-500 ${statusColors[order.orderStatus]}`}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button onClick={() => setViewOrder(order)} aria-label="View order" className="text-charcoal-700/60 hover:text-charcoal-900">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-charcoal-700/50">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!viewOrder} onClose={() => setViewOrder(null)} title="Order Details" maxWidth="max-w-lg">
        {viewOrder && (
          <div>
            <p className="font-mono text-xs text-charcoal-700/60 mb-4">{viewOrder._id}</p>
            <div className="space-y-3 mb-6">
              {viewOrder.orderItems.map((item, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-charcoal-900">{item.name}</p>
                    <p className="text-xs text-charcoal-700/60">Qty: {item.quantity} {item.variant && `· ${item.variant}`}</p>
                  </div>
                  <p className="text-charcoal-900">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="text-sm text-charcoal-700/80 mb-4">
              <p className="text-charcoal-900 font-medium mb-1">Shipping Address</p>
              <p>{viewOrder.shippingAddress.fullName}, {viewOrder.shippingAddress.street}</p>
              <p>{viewOrder.shippingAddress.city}, {viewOrder.shippingAddress.country}</p>
              <p>{viewOrder.shippingAddress.phone}</p>
            </div>
            <div className="flex justify-between font-medium text-charcoal-900 pt-4 border-t border-charcoal-900/10">
              <span>Total</span>
              <span>{formatPrice(viewOrder.totalPrice)}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminOrders;
