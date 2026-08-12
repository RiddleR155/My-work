import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Globe2, Hammer, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import Seo from '../components/common/Seo';
import ProductCard from '../components/product/ProductCard';
import QuickViewModal from '../components/product/QuickViewModal';
import { ProductGridSkeleton } from '../components/ui/Skeleton';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import Button from '../components/ui/Button';
import { fetchProducts } from '../services/productService';
import { fetchCategories } from '../services/categoryService';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const testimonials = [
  {
    name: 'James Whitfield',
    location: 'London, UK',
    quote:
      'The briefcase I ordered is easily the best-made leather good I own. Stitching, hardware, smell — everything about it says quality.',
  },
  {
    name: 'Sofia Martinez',
    location: 'Madrid, Spain',
    quote:
      'I have bought three jackets from Leathertique Impex over the years. Each one has aged into something even more beautiful than the day it arrived.',
  },
  {
    name: 'Ahmed Al-Farsi',
    location: 'Dubai, UAE',
    quote:
      'As a corporate buyer sourcing gifts for clients, their export quality and consistency across bulk orders has been unmatched.',
  },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts({ featured: true, limit: 4 }),
          fetchCategories(),
        ]);
        setFeatured(productsData.products);
        setCategories(categoriesData.slice(0, 6));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <Seo
        title="Premium Handcrafted Leather Goods"
        description="Leathertique Impex crafts premium leather jackets, bags, wallets, and belts, exported worldwide with an uncompromising standard of quality."
      />

      {/* HERO */}
      <section className="relative h-[92vh] min-h-[640px] flex items-end overflow-hidden bg-charcoal-950">
        <img
          src="https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=1800&q=80"
          alt="Premium leather jacket draped over a workbench"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-charcoal-950/20" />

        <div className="relative container-max pb-20 md:pb-28">
          <motion.img
            src="/logo.png"
            alt="Leathertique Impex emblem"
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.05, duration: 0.7 }}
            className="h-16 md:h-20 w-auto object-contain mb-6 drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gold-400 uppercase tracking-[0.3em] text-xs md:text-sm mb-5"
          >
            Est. Premium Leather Manufacturing &amp; Export
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="font-display text-cream-100 text-4xl sm:text-5xl md:text-7xl leading-[1.05] max-w-3xl"
          >
            Crafted in Leather.
            <br />
            Built for Legacy.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-cream-100/75 text-base md:text-lg max-w-xl mt-6 leading-relaxed"
          >
            Premium leather products crafted with precision, quality, and timeless design —
            manufactured in Pakistan, worn around the world.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <Link to="/shop">
              <Button variant="gold" size="lg">
                Explore Collection
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="!text-cream-100 !border-cream-100/40 hover:!bg-cream-100 hover:!text-charcoal-950">
                Discover Our Craft
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-charcoal-900 text-cream-100">
        <div className="container-max py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { to: 25, suffix: '+', label: 'Years Combined Craft Experience' },
            { to: 40, suffix: '+', label: 'Countries Exported To' },
            { to: 15000, suffix: '+', label: 'Pieces Handcrafted' },
            { to: 98, suffix: '%', label: 'Customer Satisfaction' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl md:text-4xl text-gold-400">
                <AnimatedCounter to={stat.to} suffix={stat.suffix} />
              </p>
              <p className="text-xs md:text-sm text-cream-100/60 mt-2 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BRAND INTRODUCTION */}
      <section className="container-max py-24 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <img
            src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1000&q=80"
            alt="Leather craftsman hand-stitching a product"
            className="w-full aspect-[4/5] object-cover"
          />
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="text-gold-600 uppercase tracking-[0.25em] text-xs mb-4">Who We Are</p>
          <h2 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-6 leading-tight">
            A Pakistani Leather House, Trusted Internationally
          </h2>
          <p className="text-charcoal-700/80 leading-relaxed mb-4">
            Leathertique Impex began as a small family tannery and has grown into a full-scale
            manufacturing and export house rooted in Sialkot's centuries-old leather tradition.
            Every jacket, bag, and wallet that leaves our workshop passes through the hands of
            artisans who have spent decades perfecting their craft.
          </p>
          <p className="text-charcoal-700/80 leading-relaxed mb-8">
            We combine time-honoured tanning and stitching techniques with modern quality control,
            so that what reaches your doorstep is authentic, durable, and unmistakably premium.
          </p>
          <Link to="/about" className="inline-flex items-center gap-2 text-charcoal-900 font-medium border-b-2 border-gold-500 pb-1 hover:text-gold-600 transition-colors">
            Read Our Full Story <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-cream-200 py-24">
        <div className="container-max">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-xl mx-auto mb-14">
            <p className="text-gold-600 uppercase tracking-[0.25em] text-xs mb-4">Collections</p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal-900">Shop by Category</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link to={`/shop?category=${cat._id}`} className="group relative block aspect-[4/5] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/10 to-transparent" />
                  <span className="absolute bottom-5 left-5 font-display text-cream-100 text-lg md:text-xl">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container-max py-24">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-xl mx-auto mb-14">
          <p className="text-gold-600 uppercase tracking-[0.25em] text-xs mb-4">Handpicked</p>
          <h2 className="font-display text-3xl md:text-4xl text-charcoal-900">Featured Products</h2>
        </motion.div>

        {loading ? (
          <ProductGridSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        )}

        <div className="text-center mt-14">
          <Link to="/shop">
            <Button variant="outline">
              View All Products <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-charcoal-950 text-cream-100 py-24">
        <div className="container-max">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-xl mx-auto mb-16">
            <p className="text-gold-400 uppercase tracking-[0.25em] text-xs mb-4">Why Leathertique Impex</p>
            <h2 className="font-display text-3xl md:text-4xl">Built on Craft, Trusted for Quality</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: Hammer, title: 'Authentic Craftsmanship', desc: 'Every piece is hand-cut and stitched by artisans with generational leatherworking expertise.' },
              { icon: ShieldCheck, title: 'Rigorous Quality Control', desc: 'Multi-stage inspection ensures consistent grain, stitching, and hardware quality across every batch.' },
              { icon: Globe2, title: 'International Export Standard', desc: 'Manufactured to meet the compliance and durability standards of global markets.' },
              { icon: Truck, title: 'Reliable Fulfilment', desc: 'From order to doorstep, we manage logistics carefully so your products arrive on time, intact.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <item.icon size={30} className="text-gold-400 mb-5" strokeWidth={1.25} />
                <h3 className="font-display text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-cream-100/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MANUFACTURING / CRAFTSMANSHIP */}
      <section className="container-max py-24 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="order-2 md:order-1">
          <p className="text-gold-600 uppercase tracking-[0.25em] text-xs mb-4">Our Process</p>
          <h2 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-6 leading-tight">
            From Hide to Heirloom
          </h2>
          <p className="text-charcoal-700/80 leading-relaxed mb-4">
            Our process begins with sourcing responsibly tanned, full-grain hides, hand-selected
            for grain quality and consistency. Master cutters pattern each piece to minimise waste,
            while our stitchers use saddle-stitching techniques for seams that outlast the leather itself.
          </p>
          <div className="space-y-4 mt-8">
            {[
              'Hide selection and full-grain tanning',
              'Hand-cutting and precision pattern work',
              'Saddle-stitched assembly and hardware fitting',
              'Multi-point quality inspection before export',
            ].map((step, i) => (
              <div key={step} className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-leather-800 text-cream-100 flex items-center justify-center text-sm font-display shrink-0">
                  {i + 1}
                </span>
                <p className="text-charcoal-800">{step}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="order-1 md:order-2">
          <img
            src="https://images.unsplash.com/photo-1607000975831-a45499a2b3d3?w=1000&q=80"
            alt="Artisan cutting leather by hand"
            className="w-full aspect-[4/5] object-cover"
          />
        </motion.div>
      </section>

      {/* QUALITY */}
      <section className="bg-leather-950 text-cream-100 py-24 relative overflow-hidden">
        <div className="container-max relative grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Award size={32} className="text-gold-400 mx-auto mb-4" strokeWidth={1.25} />
            <h3 className="font-display text-xl mb-2">Certified Materials</h3>
            <p className="text-sm text-cream-100/60 leading-relaxed">
              Sourced from tanneries meeting international environmental and quality standards.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Sparkles size={32} className="text-gold-400 mx-auto mb-4" strokeWidth={1.25} />
            <h3 className="font-display text-xl mb-2">Finished by Hand</h3>
            <p className="text-sm text-cream-100/60 leading-relaxed">
              Edge-painting, burnishing, and hardware fitting are all completed by hand for a refined finish.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <ShieldCheck size={32} className="text-gold-400 mx-auto mb-4" strokeWidth={1.25} />
            <h3 className="font-display text-xl mb-2">Built to Last</h3>
            <p className="text-sm text-cream-100/60 leading-relaxed">
              Every product is stress-tested at the seams and hardware before it ever ships.
            </p>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-cream-100">
        <div className="container-max">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-xl mx-auto mb-14">
            <p className="text-gold-600 uppercase tracking-[0.25em] text-xs mb-4">Testimonials</p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal-900">What Our Customers Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-cream-200 p-8 flex flex-col"
              >
                <p className="text-charcoal-800 leading-relaxed italic mb-6">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-auto">
                  <p className="font-display text-charcoal-900">{t.name}</p>
                  <p className="text-xs text-charcoal-700/60 uppercase tracking-wide">{t.location}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 bg-charcoal-950 text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1600&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative container-max">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl text-cream-100 mb-6 max-w-2xl mx-auto"
          >
            Own a Piece Made to Outlast Trends
          </motion.h2>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Link to="/shop">
              <Button variant="gold" size="lg">
                Shop the Collection <ArrowRight size={16} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
};

export default Home;
