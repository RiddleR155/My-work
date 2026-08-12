import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import Seo from '../components/common/Seo';
import Button from '../components/ui/Button';
import QuantitySelector from '../components/ui/QuantitySelector';
import EmptyState from '../components/ui/EmptyState';
import { formatPrice } from '../utils/format';
import { getShippingCost } from '../utils/pricing';
import { useCartStore, itemKey } from '../context/cartStore';
import { useAuthStore } from '../context/authStore';

const Cart = () => {
  const { items, updateQuantity, removeItem } = useCartStore();
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const shipping = items.length > 0 ? getShippingCost(subtotal) : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    navigate(user ? '/checkout' : '/account', { state: { from: { pathname: '/checkout' } } });
  };

  if (items.length === 0) {
    return (
      <div className="bg-cream-100 min-h-[70vh]">
        <Seo title="Your Cart" />
        <EmptyState
          icon={ShoppingBag}
          title="Your Cart is Empty"
          description="Looks like you haven't added anything yet. Explore our collection to find your next favourite piece."
          action={
            <Link to="/shop">
              <Button>
                Start Shopping <ArrowRight size={16} />
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="bg-cream-100">
      <Seo title="Your Cart" />

      <section className="bg-charcoal-950 py-16 text-center">
        <p className="text-gold-400 uppercase tracking-[0.25em] text-xs mb-3">Review Your Selection</p>
        <h1 className="font-display text-3xl md:text-4xl text-cream-100">Shopping Cart</h1>
      </section>

      <div className="container-max py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2">
          <AnimatePresence initial={false}>
            {items.map((item) => {
              const key = itemKey(item);
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-4 sm:gap-6 py-6 border-b border-charcoal-900/10 overflow-hidden"
                >
                  <Link to={`/product/${item.slug}`} className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-charcoal-900/5">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3 min-w-0">
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.slug}`} className="font-display text-lg text-charcoal-900 hover:text-gold-600 transition-colors line-clamp-1">
                        {item.name}
                      </Link>
                      {item.variant && <p className="text-xs text-charcoal-700/60 mt-1">{item.variant}</p>}
                      <p className="text-leather-800 font-medium mt-2">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <QuantitySelector
                        value={item.quantity}
                        max={item.stock}
                        onChange={(qty) => updateQuantity(key, qty)}
                      />
                      <button
                        onClick={() => removeItem(key)}
                        aria-label={`Remove ${item.name}`}
                        className="text-charcoal-700/50 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-charcoal-900 mt-8 hover:text-gold-600 transition-colors">
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-cream-200 p-8 sticky top-28">
            <h2 className="font-display text-xl text-charcoal-900 mb-6">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-charcoal-700/80">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-charcoal-700/80">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gold-700">
                  Add {formatPrice(15000 - subtotal)} more for free shipping
                </p>
              )}
            </div>
            <div className="flex justify-between font-display text-lg text-charcoal-900 mt-6 pt-6 border-t border-charcoal-900/10">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Button onClick={handleCheckout} size="lg" className="w-full mt-8">
              Proceed to Checkout <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
