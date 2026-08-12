import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Package, User as UserIcon, ChevronRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import Seo from '../components/common/Seo';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { formatPrice } from '../utils/format';
import { useAuthStore } from '../context/authStore';
import { login, register as registerUser, updateProfile } from '../services/authService';
import { fetchMyOrders, fetchOrderById } from '../services/orderService';
import { getErrorMessage } from '../services/api';

const inputClass =
  'w-full border border-charcoal-900/20 px-4 py-3 text-sm bg-cream-100 focus:outline-none focus:border-charcoal-900 transition-colors';

const statusColors = {
  Pending: 'bg-amber-100 text-amber-800',
  Confirmed: 'bg-blue-100 text-blue-800',
  Processing: 'bg-indigo-100 text-indigo-800',
  Shipped: 'bg-purple-100 text-purple-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

const AuthPanel = () => {
  const [mode, setMode] = useState('login');
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();
  const location = useLocation();

  const loginForm = useForm();
  const registerForm = useForm();

  const redirectAfterAuth = () => {
    const dest = location.state?.from?.pathname || '/account';
    navigate(dest, { replace: true });
  };

  const onLogin = async (data) => {
    try {
      const user = await login(data.email, data.password);
      setUser(user);
      toast.success(`Welcome back, ${user.name}`);
      redirectAfterAuth();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const onRegister = async (data) => {
    try {
      const user = await registerUser(data);
      setUser(user);
      toast.success(`Welcome to Leathertique Impex, ${user.name}`);
      redirectAfterAuth();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="container-max py-16 max-w-md">
      <div className="flex mb-10 border-b border-charcoal-900/10">
        {['login', 'register'].map((tab) => (
          <button
            key={tab}
            onClick={() => setMode(tab)}
            className={`flex-1 pb-4 text-sm uppercase tracking-wide transition-colors border-b-2 ${
              mode === tab ? 'border-gold-500 text-charcoal-900' : 'border-transparent text-charcoal-700/50'
            }`}
          >
            {tab === 'login' ? 'Login' : 'Register'}
          </button>
        ))}
      </div>

      {mode === 'login' ? (
        <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-5">
          <div>
            <label htmlFor="login-email" className="block text-sm text-charcoal-900 mb-2">Email</label>
            <input id="login-email" type="email" className={inputClass} {...loginForm.register('email', { required: true })} />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm text-charcoal-900 mb-2">Password</label>
            <input id="login-password" type="password" className={inputClass} {...loginForm.register('password', { required: true })} />
          </div>
          <Button type="submit" size="lg" loading={loginForm.formState.isSubmitting} className="w-full">
            Login
          </Button>
          <p className="text-xs text-charcoal-700/50 text-center pt-2">
            Demo: admin@leathertiqueimpex.com / Admin@123 &middot; customer@leathertiqueimpex.com / Customer@123
          </p>
        </form>
      ) : (
        <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-5">
          <div>
            <label htmlFor="reg-name" className="block text-sm text-charcoal-900 mb-2">Full Name</label>
            <input id="reg-name" className={inputClass} {...registerForm.register('name', { required: true })} />
          </div>
          <div>
            <label htmlFor="reg-email" className="block text-sm text-charcoal-900 mb-2">Email</label>
            <input id="reg-email" type="email" className={inputClass} {...registerForm.register('email', { required: true })} />
          </div>
          <div>
            <label htmlFor="reg-phone" className="block text-sm text-charcoal-900 mb-2">Phone</label>
            <input id="reg-phone" className={inputClass} {...registerForm.register('phone')} />
          </div>
          <div>
            <label htmlFor="reg-password" className="block text-sm text-charcoal-900 mb-2">Password</label>
            <input
              id="reg-password"
              type="password"
              className={inputClass}
              {...registerForm.register('password', { required: true, minLength: 6 })}
            />
          </div>
          <Button type="submit" size="lg" loading={registerForm.formState.isSubmitting} className="w-full">
            Create Account
          </Button>
        </form>
      )}
    </div>
  );
};

const OrderDetail = ({ orderId, onBack }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderById(orderId)
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return <p className="text-sm text-charcoal-700/60">Loading order...</p>;
  if (!order) return <p className="text-sm text-charcoal-700/60">Order not found.</p>;

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-charcoal-900 mb-6 hover:text-gold-600">
        <ArrowLeft size={16} /> Back to Orders
      </button>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <p className="text-xs text-charcoal-700/60">Order ID</p>
          <p className="font-mono text-sm text-charcoal-900">{order._id}</p>
        </div>
        <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${statusColors[order.orderStatus]}`}>
          {order.orderStatus}
        </span>
      </div>

      <div className="space-y-4 mb-8">
        {order.orderItems.map((item, i) => (
          <div key={i} className="flex gap-4 py-3 border-b border-charcoal-900/10">
            <div className="w-16 h-16 shrink-0 bg-charcoal-900/5">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-charcoal-900 text-sm">{item.name}</p>
              {item.variant && <p className="text-xs text-charcoal-700/60">{item.variant}</p>}
              <p className="text-xs text-charcoal-700/60">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm text-charcoal-900">{formatPrice(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm uppercase tracking-wide text-charcoal-900 mb-3">Shipping Address</h3>
          <p className="text-sm text-charcoal-700/80 leading-relaxed">
            {order.shippingAddress.fullName}
            <br />
            {order.shippingAddress.street}, {order.shippingAddress.city}
            <br />
            {order.shippingAddress.state} {order.shippingAddress.postalCode}
            <br />
            {order.shippingAddress.country}
            <br />
            {order.shippingAddress.phone}
          </p>
        </div>
        <div>
          <h3 className="text-sm uppercase tracking-wide text-charcoal-900 mb-3">Payment</h3>
          <p className="text-sm text-charcoal-700/80">Method: {order.paymentMethod}</p>
          <p className="text-sm text-charcoal-700/80">Status: {order.paymentStatus}</p>
          <div className="mt-4 space-y-1 text-sm">
            <div className="flex justify-between text-charcoal-700/80">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-charcoal-700/80">
              <span>Shipping</span>
              <span>{order.shippingCost === 0 ? 'Free' : formatPrice(order.shippingCost)}</span>
            </div>
            <div className="flex justify-between font-medium text-charcoal-900 pt-2 border-t border-charcoal-900/10">
              <span>Total</span>
              <span>{formatPrice(order.totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomerDashboard = () => {
  const { user, logout, updateUser } = useAuthStore();
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const profileForm = useForm({
    defaultValues: {
      name: user.name,
      phone: user.phone || '',
      street: user.address?.street || '',
      city: user.address?.city || '',
      state: user.address?.state || '',
      postalCode: user.address?.postalCode || '',
      country: user.address?.country || 'Pakistan',
    },
  });

  useEffect(() => {
    fetchMyOrders()
      .then(setOrders)
      .catch(() => {})
      .finally(() => setLoadingOrders(false));
  }, []);

  const onUpdateProfile = async (data) => {
    try {
      const { name, phone, ...address } = data;
      const updated = await updateProfile({ name, phone, address });
      updateUser(updated);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="container-max py-16">
      <div className="flex flex-col sm:flex-row gap-10">
        {/* Sidebar */}
        <aside className="sm:w-56 shrink-0">
          <div className="mb-8">
            <p className="font-display text-lg text-charcoal-900">{user.name}</p>
            <p className="text-sm text-charcoal-700/60">{user.email}</p>
          </div>
          <nav className="space-y-1">
            <button
              onClick={() => {
                setTab('orders');
                setSelectedOrderId(null);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors ${
                tab === 'orders' ? 'bg-charcoal-950 text-cream-100' : 'text-charcoal-800 hover:bg-charcoal-900/5'
              }`}
            >
              <Package size={16} /> Order History
            </button>
            <button
              onClick={() => setTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors ${
                tab === 'profile' ? 'bg-charcoal-950 text-cream-100' : 'text-charcoal-800 hover:bg-charcoal-900/5'
              }`}
            >
              <UserIcon size={16} /> Profile
            </button>
            {user.role === 'admin' && (
              <Link
                to="/admin"
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left text-charcoal-800 hover:bg-charcoal-900/5"
              >
                <ChevronRight size={16} /> Admin Dashboard
              </Link>
            )}
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left text-red-700 hover:bg-red-50"
            >
              <LogOut size={16} /> Logout
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {tab === 'orders' &&
            (selectedOrderId ? (
              <OrderDetail orderId={selectedOrderId} onBack={() => setSelectedOrderId(null)} />
            ) : loadingOrders ? (
              <p className="text-sm text-charcoal-700/60">Loading orders...</p>
            ) : orders.length === 0 ? (
              <EmptyState
                icon={Package}
                title="No orders yet"
                description="Your placed orders will appear here."
                action={
                  <Link to="/shop">
                    <Button variant="outline">Start Shopping</Button>
                  </Link>
                }
              />
            ) : (
              <div className="space-y-4">
                <h2 className="font-display text-xl text-charcoal-900 mb-6">Order History</h2>
                {orders.map((order) => (
                  <button
                    key={order._id}
                    onClick={() => setSelectedOrderId(order._id)}
                    className="w-full flex items-center justify-between gap-4 bg-cream-200 p-5 text-left hover:bg-cream-300 transition-colors"
                  >
                    <div>
                      <p className="font-mono text-xs text-charcoal-700/60 mb-1">{order._id}</p>
                      <p className="text-sm text-charcoal-900">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}{' '}
                        &middot; {order.orderItems.length} item{order.orderItems.length > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${statusColors[order.orderStatus]}`}>
                        {order.orderStatus}
                      </span>
                      <span className="font-medium text-charcoal-900">{formatPrice(order.totalPrice)}</span>
                      <ChevronRight size={16} className="text-charcoal-700/40" />
                    </div>
                  </button>
                ))}
              </div>
            ))}

          {tab === 'profile' && (
            <div>
              <h2 className="font-display text-xl text-charcoal-900 mb-6">My Profile</h2>
              <form onSubmit={profileForm.handleSubmit(onUpdateProfile)} className="max-w-lg space-y-5">
                <div>
                  <label htmlFor="p-name" className="block text-sm text-charcoal-900 mb-2">Full Name</label>
                  <input id="p-name" className={inputClass} {...profileForm.register('name')} />
                </div>
                <div>
                  <label htmlFor="p-phone" className="block text-sm text-charcoal-900 mb-2">Phone</label>
                  <input id="p-phone" className={inputClass} {...profileForm.register('phone')} />
                </div>
                <div>
                  <label htmlFor="p-street" className="block text-sm text-charcoal-900 mb-2">Street Address</label>
                  <input id="p-street" className={inputClass} {...profileForm.register('street')} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="p-city" className="block text-sm text-charcoal-900 mb-2">City</label>
                    <input id="p-city" className={inputClass} {...profileForm.register('city')} />
                  </div>
                  <div>
                    <label htmlFor="p-state" className="block text-sm text-charcoal-900 mb-2">State</label>
                    <input id="p-state" className={inputClass} {...profileForm.register('state')} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="p-postal" className="block text-sm text-charcoal-900 mb-2">Postal Code</label>
                    <input id="p-postal" className={inputClass} {...profileForm.register('postalCode')} />
                  </div>
                  <div>
                    <label htmlFor="p-country" className="block text-sm text-charcoal-900 mb-2">Country</label>
                    <input id="p-country" className={inputClass} {...profileForm.register('country')} />
                  </div>
                </div>
                <Button type="submit" loading={profileForm.formState.isSubmitting}>
                  Save Changes
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Account = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="bg-cream-100 min-h-[70vh]">
      <Seo title={user ? 'My Account' : 'Login or Register'} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        {user ? <CustomerDashboard /> : <AuthPanel />}
      </motion.div>
    </div>
  );
};

export default Account;
