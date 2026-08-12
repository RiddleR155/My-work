import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import Rating from '../ui/Rating';
import Button from '../ui/Button';
import { formatPrice } from '../../utils/format';
import { useCartStore } from '../../context/cartStore';

const QuickViewModal = ({ product, onClose }) => {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      image: product.images?.[0] || '',
      price: product.price,
      quantity: 1,
      stock: product.stock,
      variant: '',
    });
    toast.success(`${product.name} added to cart`);
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-charcoal-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-cream-100 max-w-3xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 relative"
          >
            <button
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-charcoal-950/80 text-cream-100 flex items-center justify-center"
            >
              <X size={18} />
            </button>
            <div className="aspect-square bg-charcoal-900/5">
              <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 md:p-8 flex flex-col">
              <p className="text-[11px] uppercase tracking-widest text-charcoal-700/60 mb-2">
                {product.category?.name}
              </p>
              <h2 className="font-display text-2xl text-charcoal-900 mb-2">{product.name}</h2>
              {product.rating > 0 && (
                <div className="mb-3">
                  <Rating value={product.rating} count={product.numReviews} />
                </div>
              )}
              <p className="text-xl text-leather-800 font-medium mb-4">{formatPrice(product.price)}</p>
              <p className="text-sm text-charcoal-700/80 leading-relaxed mb-6 line-clamp-4">
                {product.description}
              </p>

              <div className="mt-auto space-y-3">
                <Button onClick={handleAddToCart} disabled={product.stock < 1} className="w-full">
                  <ShoppingBag size={16} />
                  {product.stock < 1 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                <Link
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="block text-center text-sm text-charcoal-900 underline underline-offset-4 hover:text-gold-600"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
