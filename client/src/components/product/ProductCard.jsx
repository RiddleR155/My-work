import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import Rating from '../ui/Rating';
import { formatPrice } from '../../utils/format';
import { useCartStore } from '../../context/cartStore';
import { useWishlistStore } from '../../context/wishlistStore';

const ProductCard = ({ product, onQuickView }) => {
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product.stock < 1) return;
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
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggle(product._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden bg-charcoal-900/5 aspect-[3/4]">
          <img
            src={product.images?.[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {product.stock < 1 && (
            <span className="absolute top-3 left-3 bg-charcoal-950 text-cream-100 text-[10px] tracking-widest uppercase px-3 py-1.5">
              Out of Stock
            </span>
          )}
          {product.featured && product.stock > 0 && (
            <span className="absolute top-3 left-3 bg-gold-500 text-charcoal-950 text-[10px] tracking-widest uppercase px-3 py-1.5">
              Featured
            </span>
          )}

          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-cream-100/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Heart size={16} className={wishlisted ? 'fill-leather-700 text-leather-700' : 'text-charcoal-900'} />
          </button>

          <div className="absolute bottom-0 inset-x-0 flex gap-2 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              disabled={product.stock < 1}
              className="flex-1 flex items-center justify-center gap-2 bg-charcoal-950 text-cream-100 text-xs uppercase tracking-wider py-3 hover:bg-gold-500 hover:text-charcoal-950 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={14} />
              Add to Cart
            </button>
            {onQuickView && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onQuickView(product);
                }}
                aria-label="Quick view"
                className="w-11 flex items-center justify-center bg-cream-100 text-charcoal-950 hover:bg-gold-500 transition-colors"
              >
                <Eye size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-[11px] uppercase tracking-widest text-charcoal-700/60">
            {product.category?.name}
          </p>
          <h3 className="font-display text-base text-charcoal-900 leading-snug">{product.name}</h3>
          {product.rating > 0 && <Rating value={product.rating} count={product.numReviews} />}
          <p className="text-leather-800 font-medium">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
