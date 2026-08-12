import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Zap, Truck, ShieldCheck, RotateCcw, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import Seo from '../components/common/Seo';
import Rating from '../components/ui/Rating';
import QuantitySelector from '../components/ui/QuantitySelector';
import Button from '../components/ui/Button';
import ProductCard from '../components/product/ProductCard';
import { Skeleton } from '../components/ui/Skeleton';
import { formatPrice } from '../utils/format';
import { fetchProductById, fetchRelatedProducts } from '../services/productService';
import { fetchProductReviews, createReview } from '../services/reviewService';
import { useCartStore } from '../context/cartStore';
import { useAuthStore } from '../context/authStore';
import { getErrorMessage } from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const user = useAuthStore((s) => s.user);

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        setActiveImage(0);
        setQuantity(1);
        const initialVariants = {};
        data.variants?.forEach((v) => {
          initialVariants[v.name] = v.options[0];
        });
        setSelectedVariants(initialVariants);

        const [relatedData, reviewsData] = await Promise.all([
          fetchRelatedProducts(data._id),
          fetchProductReviews(data._id),
        ]);
        setRelated(relatedData);
        setReviews(reviewsData);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [id]);

  const variantLabel = Object.values(selectedVariants).filter(Boolean).join(' / ');

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      image: product.images?.[0] || '',
      price: product.price,
      quantity,
      stock: product.stock,
      variant: variantLabel,
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to leave a review');
      navigate('/account');
      return;
    }
    setSubmittingReview(true);
    try {
      await createReview(product._id, reviewForm);
      toast.success('Thank you for your review!');
      const [updatedProduct, updatedReviews] = await Promise.all([
        fetchProductById(id),
        fetchProductReviews(product._id),
      ]);
      setProduct(updatedProduct);
      setReviews(updatedReviews);
      setReviewForm({ rating: 5, comment: '' });
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="container-max py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <Skeleton className="aspect-square w-full" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="container-max py-24 text-center">
        <h1 className="font-display text-2xl text-charcoal-900 mb-4">Product Not Found</h1>
        <p className="text-charcoal-700/70 mb-8">
          We couldn't find the product you're looking for. It may have been removed.
        </p>
        <Link to="/shop">
          <Button>Back to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream-100">
      <Seo title={product.name} description={product.description?.slice(0, 155)} />

      <div className="container-max py-6 text-xs text-charcoal-700/60">
        <Link to="/" className="hover:text-charcoal-900">Home</Link> /{' '}
        <Link to="/shop" className="hover:text-charcoal-900">Shop</Link> /{' '}
        <span className="text-charcoal-900">{product.name}</span>
      </div>

      <div className="container-max pb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div>
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="aspect-square overflow-hidden bg-charcoal-900/5 mb-4"
          >
            <img
              src={product.images?.[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          {product.images?.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 shrink-0 overflow-hidden border-2 transition-colors ${
                    activeImage === i ? 'border-gold-500' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-[11px] uppercase tracking-widest text-charcoal-700/60 mb-2">
            {product.category?.name}
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-3">{product.name}</h1>

          {product.numReviews > 0 ? (
            <div className="mb-4">
              <Rating value={product.rating} count={product.numReviews} size={16} />
            </div>
          ) : (
            <p className="text-xs text-charcoal-700/50 mb-4">No reviews yet</p>
          )}

          <p className="text-2xl text-leather-800 font-medium mb-6">{formatPrice(product.price)}</p>

          <p className="text-charcoal-700/80 leading-relaxed mb-8">{product.description}</p>

          {product.variants?.map((variant) => (
            <div key={variant.name} className="mb-6">
              <h3 className="text-sm uppercase tracking-wide text-charcoal-900 mb-3">{variant.name}</h3>
              <div className="flex flex-wrap gap-2">
                {variant.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedVariants((prev) => ({ ...prev, [variant.name]: opt }))}
                    className={`px-4 py-2 text-sm border transition-colors ${
                      selectedVariants[variant.name] === opt
                        ? 'bg-charcoal-950 text-cream-100 border-charcoal-950'
                        : 'border-charcoal-900/20 text-charcoal-800 hover:border-charcoal-900'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="flex items-center gap-3 mb-2">
            <span
              className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-600' : 'bg-red-600'}`}
            />
            <span className="text-sm text-charcoal-700/80">
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </span>
          </div>

          <div className="flex items-center gap-4 my-6">
            <span className="text-sm text-charcoal-900">Quantity</span>
            <QuantitySelector value={quantity} onChange={setQuantity} max={product.stock} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock < 1}
              size="lg"
              variant="outline"
              className="flex-1"
            >
              <ShoppingBag size={16} />
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              disabled={product.stock < 1}
              size="lg"
              variant="primary"
              className="flex-1"
            >
              <Zap size={16} />
              Buy Now
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-charcoal-900/10">
            <div className="flex items-center gap-3 text-xs text-charcoal-700/70">
              <Truck size={18} className="text-leather-800 shrink-0" />
              Nationwide &amp; export delivery
            </div>
            <div className="flex items-center gap-3 text-xs text-charcoal-700/70">
              <ShieldCheck size={18} className="text-leather-800 shrink-0" />
              Authentic full-grain leather
            </div>
            <div className="flex items-center gap-3 text-xs text-charcoal-700/70">
              <RotateCcw size={18} className="text-leather-800 shrink-0" />
              7-day exchange policy
            </div>
          </div>

          {product.specifications?.length > 0 && (
            <div className="mt-10 pt-8 border-t border-charcoal-900/10">
              <h3 className="font-display text-lg text-charcoal-900 mb-4">Specifications</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-sm">
                {product.specifications.map((spec) => (
                  <div key={spec.key} className="flex gap-2">
                    <dt className="text-charcoal-700/60 min-w-[110px]">{spec.key}</dt>
                    <dd className="text-charcoal-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="container-max py-16 border-t border-charcoal-900/10">
        <h2 className="font-display text-2xl text-charcoal-900 mb-8">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-charcoal-700/60 text-sm">Be the first to review this product.</p>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="border-b border-charcoal-900/10 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-charcoal-900">{review.user?.name || 'Anonymous'}</p>
                    <Rating value={review.rating} />
                  </div>
                  <p className="text-sm text-charcoal-700/80 leading-relaxed">{review.comment}</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleReviewSubmit} className="bg-cream-200 p-6 md:p-8">
            <h3 className="font-display text-lg text-charcoal-900 mb-5">Write a Review</h3>
            <div className="mb-5">
              <label className="block text-sm text-charcoal-900 mb-2">Your Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setReviewForm((f) => ({ ...f, rating: star }))}
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      size={22}
                      className={star <= reviewForm.rating ? 'fill-gold-500 text-gold-500' : 'text-charcoal-700/30'}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="comment" className="block text-sm text-charcoal-900 mb-2">
                Your Review
              </label>
              <textarea
                id="comment"
                required
                rows={4}
                value={reviewForm.comment}
                onChange={(e) => setReviewForm((f) => ({ ...f, comment: e.target.value }))}
                className="w-full border border-charcoal-900/20 px-3 py-2.5 text-sm focus:outline-none focus:border-charcoal-900 bg-cream-100"
                placeholder="Share your experience with this product..."
              />
            </div>
            <Button type="submit" loading={submittingReview}>
              Submit Review
            </Button>
          </form>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="container-max py-16 border-t border-charcoal-900/10">
          <h2 className="font-display text-2xl text-charcoal-900 mb-10 text-center">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
