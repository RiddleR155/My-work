import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, PackageSearch } from 'lucide-react';
import Seo from '../components/common/Seo';
import ProductCard from '../components/product/ProductCard';
import QuickViewModal from '../components/product/QuickViewModal';
import { ProductGridSkeleton } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import { fetchProducts } from '../services/productService';
import { fetchCategories } from '../services/categoryService';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'rating', label: 'Top Rated' },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sort = searchParams.get('sort') || 'newest';

  const [priceDraft, setPriceDraft] = useState({ min: minPrice, max: maxPrice });

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
  }, []);

  const loadProducts = useCallback(
    async (targetPage, append) => {
      append ? setLoadingMore(true) : setLoading(true);
      try {
        const data = await fetchProducts({
          search: search || undefined,
          category: category || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          sort,
          page: targetPage,
          limit: 12,
        });
        setProducts((prev) => (append ? [...prev, ...data.products] : data.products));
        setPages(data.pages);
        setTotal(data.total);
        setPage(data.page);
      } catch (err) {
        console.error(err);
      } finally {
        append ? setLoadingMore(false) : setLoading(false);
      }
    },
    [search, category, minPrice, maxPrice, sort]
  );

  useEffect(() => {
    loadProducts(1, false);
    setPriceDraft({ min: minPrice, max: maxPrice });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, minPrice, maxPrice, sort]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  const applyPriceFilter = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (priceDraft.min) next.set('minPrice', priceDraft.min);
    else next.delete('minPrice');
    if (priceDraft.max) next.set('maxPrice', priceDraft.max);
    else next.delete('maxPrice');
    setSearchParams(next);
    setFiltersOpen(false);
  };

  const clearFilters = () => {
    setSearchParams({});
    setPriceDraft({ min: '', max: '' });
  };

  const activeFilterCount = [category, minPrice, maxPrice].filter(Boolean).length;

  const activeCategoryName = useMemo(
    () => categories.find((c) => c._id === category)?.name,
    [categories, category]
  );

  return (
    <div className="bg-cream-100">
      <Seo
        title="Shop All Leather Products"
        description="Browse our full collection of premium leather jackets, bags, wallets, belts and accessories."
      />

      <section className="bg-charcoal-950 py-16 text-center">
        <p className="text-gold-400 uppercase tracking-[0.25em] text-xs mb-3">Our Collection</p>
        <h1 className="font-display text-3xl md:text-4xl text-cream-100">Shop Leather Goods</h1>
      </section>

      <div className="container-max py-12">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 text-sm border border-charcoal-900/20 px-4 py-2.5 hover:border-charcoal-900 transition-colors"
            >
              <SlidersHorizontal size={15} />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
            {search && (
              <span className="text-sm text-charcoal-700/70">
                Results for <strong className="text-charcoal-900">&ldquo;{search}&rdquo;</strong>
              </span>
            )}
            {activeCategoryName && !search && (
              <span className="text-sm text-charcoal-700/70">
                Category: <strong className="text-charcoal-900">{activeCategoryName}</strong>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-charcoal-700/60 hidden sm:inline">{total} products</span>
            <select
              value={sort}
              onChange={(e) => updateParam('sort', e.target.value)}
              aria-label="Sort products"
              className="text-sm border border-charcoal-900/20 px-3 py-2.5 bg-cream-100 focus:outline-none focus:border-charcoal-900"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => updateParam('category', '')}
            className={`text-xs uppercase tracking-wide px-4 py-2 border transition-colors ${
              !category ? 'bg-charcoal-950 text-cream-100 border-charcoal-950' : 'border-charcoal-900/20 text-charcoal-800 hover:border-charcoal-900'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => updateParam('category', cat._id)}
              className={`text-xs uppercase tracking-wide px-4 py-2 border transition-colors ${
                category === cat._id ? 'bg-charcoal-950 text-cream-100 border-charcoal-950' : 'border-charcoal-900/20 text-charcoal-800 hover:border-charcoal-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <ProductGridSkeleton count={12} />
        ) : products.length === 0 ? (
          <EmptyState
            icon={PackageSearch}
            title="No products found"
            description="Try adjusting your filters or search terms."
            action={
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} onQuickView={setQuickViewProduct} />
              ))}
            </div>

            {page < pages && (
              <div className="text-center mt-14">
                <Button variant="outline" loading={loadingMore} onClick={() => loadProducts(page + 1, true)}>
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Filters drawer */}
      {filtersOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[70] bg-charcoal-950/60"
          onClick={() => setFiltersOpen(false)}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute left-0 top-0 h-full w-full max-w-sm bg-cream-100 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-xl text-charcoal-900">Filters</h2>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={applyPriceFilter}>
              <h3 className="text-sm uppercase tracking-wide text-charcoal-900 mb-4">Price Range (PKR)</h3>
              <div className="flex items-center gap-3 mb-8">
                <input
                  type="number"
                  min="0"
                  placeholder="Min"
                  value={priceDraft.min}
                  onChange={(e) => setPriceDraft((p) => ({ ...p, min: e.target.value }))}
                  className="w-full border border-charcoal-900/20 px-3 py-2 text-sm focus:outline-none focus:border-charcoal-900"
                />
                <span className="text-charcoal-700/50">-</span>
                <input
                  type="number"
                  min="0"
                  placeholder="Max"
                  value={priceDraft.max}
                  onChange={(e) => setPriceDraft((p) => ({ ...p, max: e.target.value }))}
                  className="w-full border border-charcoal-900/20 px-3 py-2 text-sm focus:outline-none focus:border-charcoal-900"
                />
              </div>

              <h3 className="text-sm uppercase tracking-wide text-charcoal-900 mb-4">Category</h3>
              <div className="space-y-2 mb-8">
                <label className="flex items-center gap-3 text-sm text-charcoal-800">
                  <input
                    type="radio"
                    name="category"
                    checked={!category}
                    onChange={() => updateParam('category', '')}
                  />
                  All Categories
                </label>
                {categories.map((cat) => (
                  <label key={cat._id} className="flex items-center gap-3 text-sm text-charcoal-800">
                    <input
                      type="radio"
                      name="category"
                      checked={category === cat._id}
                      onChange={() => updateParam('category', cat._id)}
                    />
                    {cat.name}
                  </label>
                ))}
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  Apply Filters
                </Button>
                <Button type="button" variant="outline" onClick={clearFilters}>
                  Clear
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
};

export default Shop;
