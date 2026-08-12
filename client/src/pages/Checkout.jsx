import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Truck, PackageCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import Seo from '../components/common/Seo';
import Button from '../components/ui/Button';
import { formatPrice } from '../utils/format';
import { getShippingCost } from '../utils/pricing';
import { useCartStore } from '../context/cartStore';
import { useAuthStore } from '../context/authStore';
import { createOrder } from '../services/orderService';
import { getErrorMessage } from '../services/api';

const Checkout = () => {
  const { items, subtotal, clearCart } = useCartStore();
  const user = useAuthStore((s) => s.user);
  const [placedOrder, setPlacedOrder] = useState(null);

  const cartSubtotal = subtotal();
  const shipping = getShippingCost(cartSubtotal);
  const total = cartSubtotal + shipping;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: user?.name || '',
      phone: user?.phone || '',
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      postalCode: user?.address?.postalCode || '',
      country: user?.address?.country || 'Pakistan',
    },
  });

  const inputClass =
    'w-full border border-charcoal-900/20 px-4 py-3 text-sm bg-cream-100 focus:outline-none focus:border-charcoal-900 transition-colors';

  const onSubmit = async (formData) => {
    if (items.length === 0) return;
    try {
      const orderItems = items.map((i) => ({
        product: i.productId,
        quantity: i.quantity,
        variant: i.variant,
      }));

      const order = await createOrder({
        orderItems,
        shippingAddress: formData,
        paymentMethod: 'Cash on Delivery',
      });

      setPlacedOrder(order);
      clearCart();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (placedOrder) {
    return (
      <div className="bg-cream-100 min-h-[70vh] flex items-center justify-center py-20">
        <Seo title="Order Confirmed" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg px-6"
        >
          <CheckCircle2 size={56} className="text-green-700 mx-auto mb-6" strokeWidth={1.25} />
          <h1 className="font-display text-3xl text-charcoal-900 mb-4">Order Placed Successfully</h1>
          <p className="text-charcoal-700/80 mb-2">
            Thank you, {placedOrder.shippingAddress.fullName}. Your order has been confirmed.
          </p>
          <p className="text-sm text-charcoal-700/60 mb-8">
            Order ID: <span className="font-mono">{placedOrder._id}</span> &middot; Total:{' '}
            {formatPrice(placedOrder.totalPrice)} &middot; Payment: Cash on Delivery
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/account">
              <Button variant="primary">View My Orders</Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-cream-100 min-h-[70vh] flex items-center justify-center text-center px-6">
        <div>
          <h1 className="font-display text-2xl text-charcoal-900 mb-4">Your cart is empty</h1>
          <p className="text-charcoal-700/70 mb-8">Add some products before proceeding to checkout.</p>
          <Link to="/shop">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-100">
      <Seo title="Checkout" />

      <section className="bg-charcoal-950 py-16 text-center">
        <p className="text-gold-400 uppercase tracking-[0.25em] text-xs mb-3">Almost There</p>
        <h1 className="font-display text-3xl md:text-4xl text-cream-100">Checkout</h1>
      </section>

      <div className="container-max py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="font-display text-xl text-charcoal-900 mb-6 flex items-center gap-2">
              <Truck size={20} className="text-leather-800" />
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="block text-sm text-charcoal-900 mb-2">Full Name *</label>
                <input id="fullName" className={inputClass} {...register('fullName', { required: 'Full name is required' })} />
                {errors.fullName && <p className="text-red-700 text-xs mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm text-charcoal-900 mb-2">Phone Number *</label>
                <input id="phone" className={inputClass} {...register('phone', { required: 'Phone number is required' })} />
                {errors.phone && <p className="text-red-700 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label htmlFor="city" className="block text-sm text-charcoal-900 mb-2">City *</label>
                <input id="city" className={inputClass} {...register('city', { required: 'City is required' })} />
                {errors.city && <p className="text-red-700 text-xs mt-1">{errors.city.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="street" className="block text-sm text-charcoal-900 mb-2">Street Address *</label>
                <input id="street" className={inputClass} {...register('street', { required: 'Street address is required' })} />
                {errors.street && <p className="text-red-700 text-xs mt-1">{errors.street.message}</p>}
              </div>
              <div>
                <label htmlFor="state" className="block text-sm text-charcoal-900 mb-2">State / Province</label>
                <input id="state" className={inputClass} {...register('state')} />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm text-charcoal-900 mb-2">Postal Code</label>
                <input id="postalCode" className={inputClass} {...register('postalCode')} />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm text-charcoal-900 mb-2">Country</label>
                <input id="country" className={inputClass} {...register('country')} />
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal-900 mb-6 flex items-center gap-2">
              <PackageCheck size={20} className="text-leather-800" />
              Payment Method
            </h2>
            <label className="flex items-start gap-4 border border-gold-500 bg-gold-500/5 p-5 cursor-pointer">
              <input type="radio" checked readOnly className="mt-1" />
              <div>
                <p className="font-medium text-charcoal-900">Cash on Delivery</p>
                <p className="text-sm text-charcoal-700/70 mt-1">
                  Pay in cash when your order is delivered to your doorstep. Online payment options
                  are coming soon.
                </p>
              </div>
            </label>
          </div>

          <Button type="submit" size="lg" loading={isSubmitting} className="w-full sm:w-auto">
            Place Order
          </Button>
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-cream-200 p-8 sticky top-28">
            <h2 className="font-display text-xl text-charcoal-900 mb-6">Order Summary</h2>
            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.productId + item.variant} className="flex gap-3 text-sm">
                  <div className="w-14 h-14 shrink-0 bg-charcoal-900/5 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-2 -right-2 bg-charcoal-950 text-cream-100 text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-charcoal-900 line-clamp-1">{item.name}</p>
                    {item.variant && <p className="text-xs text-charcoal-700/60">{item.variant}</p>}
                  </div>
                  <p className="text-charcoal-900 whitespace-nowrap">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3 text-sm mt-6 pt-6 border-t border-charcoal-900/10">
              <div className="flex justify-between text-charcoal-700/80">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-charcoal-700/80">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
            </div>
            <div className="flex justify-between font-display text-lg text-charcoal-900 mt-6 pt-6 border-t border-charcoal-900/10">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
