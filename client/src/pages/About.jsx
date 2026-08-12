import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Handshake, Leaf, Target } from 'lucide-react';
import Seo from '../components/common/Seo';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import Button from '../components/ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const About = () => {
  return (
    <div className="bg-cream-100">
      <Seo
        title="About Us"
        description="Discover the story of Leathertique Impex — a Pakistani leather manufacturing and export house built on craftsmanship, quality control, and trust."
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] flex items-center bg-charcoal-950 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1520975954732-35dd22299614?w=1800&q=80"
          alt="Leather workshop"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
        <div className="relative container-max">
          <p className="text-gold-400 uppercase tracking-[0.25em] text-xs mb-4">Our Story</p>
          <h1 className="font-display text-4xl md:text-6xl text-cream-100 max-w-2xl leading-tight">
            Three Generations of Leather Craftsmanship
          </h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="container-max py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="text-gold-600 uppercase tracking-[0.25em] text-xs mb-4">Company Introduction</p>
          <h2 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-6 leading-tight">
            Rooted in Sialkot's Leather Tradition
          </h2>
          <p className="text-charcoal-700/80 leading-relaxed mb-4">
            Leathertique Impex was founded in the heart of Pakistan's leather manufacturing hub,
            where tanning and stitching skills have been passed down through generations. What
            began as a modest family workshop has grown into a manufacturing and export house
            supplying premium leather goods to markets across the globe.
          </p>
          <p className="text-charcoal-700/80 leading-relaxed">
            Today, we operate with the same values our founders started with — respect for the
            material, respect for the craft, and an unwavering commitment to the customer who will
            eventually carry, wear, or gift what we make.
          </p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=700&q=80" alt="Leather tools" className="w-full aspect-square object-cover" />
          <img src="https://images.unsplash.com/photo-1601924287811-e34de5d18f8a?w=700&q=80" alt="Leather hide" className="w-full aspect-square object-cover mt-8" />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-charcoal-900 text-cream-100 py-16">
        <div className="container-max grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { to: 25, suffix: '+', label: 'Years of Craft Heritage' },
            { to: 40, suffix: '+', label: 'Export Destinations' },
            { to: 120, suffix: '+', label: 'Skilled Artisans' },
            { to: 15000, suffix: '+', label: 'Products Handcrafted' },
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

      {/* Craftsmanship + Quality Control */}
      <section className="container-max py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="order-2 md:order-1">
          <img
            src="https://images.unsplash.com/photo-1607000975831-a45499a2b3d3?w=1000&q=80"
            alt="Leather craftsman at work"
            className="w-full aspect-[4/5] object-cover"
          />
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="order-1 md:order-2">
          <p className="text-gold-600 uppercase tracking-[0.25em] text-xs mb-4">Craftsmanship &amp; Quality Control</p>
          <h2 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-6 leading-tight">
            Every Stitch Is Inspected, Every Hide Is Chosen
          </h2>
          <p className="text-charcoal-700/80 leading-relaxed mb-4">
            Our artisans hand-select each hide for grain consistency before it ever reaches the
            cutting table. Patterns are cut to minimise waste, seams are saddle-stitched by hand,
            and every hardware fitting is tested for durability.
          </p>
          <p className="text-charcoal-700/80 leading-relaxed">
            Before any product is packed for shipment, it passes through a multi-point quality
            inspection covering stitching integrity, hardware function, colour consistency, and
            overall finish — the same standard whether the order is for one customer or one thousand.
          </p>
        </motion.div>
      </section>

      {/* Manufacturing & Export Capabilities */}
      <section className="bg-cream-200 py-24">
        <div className="container-max">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-gold-600 uppercase tracking-[0.25em] text-xs mb-4">Capabilities</p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal-900">
              Manufacturing &amp; Export Capabilities
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Compass size={30} className="text-leather-800 mx-auto mb-4" strokeWidth={1.25} />
              <h3 className="font-display text-lg text-charcoal-900 mb-2">In-House Production</h3>
              <p className="text-sm text-charcoal-700/70 leading-relaxed">
                From tanning liaison to final packaging, production stays under one roof for full
                control over quality and timelines.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Leaf size={30} className="text-leather-800 mx-auto mb-4" strokeWidth={1.25} />
              <h3 className="font-display text-lg text-charcoal-900 mb-2">Responsible Sourcing</h3>
              <p className="text-sm text-charcoal-700/70 leading-relaxed">
                We work only with tanneries that meet environmental and labour compliance
                standards recognised internationally.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <Handshake size={30} className="text-leather-800 mx-auto mb-4" strokeWidth={1.25} />
              <h3 className="font-display text-lg text-charcoal-900 mb-2">Bulk &amp; Custom Export</h3>
              <p className="text-sm text-charcoal-700/70 leading-relaxed">
                We support wholesale and private-label export orders with consistent specifications
                across large production runs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container-max py-24 grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-charcoal-950 text-cream-100 p-10 md:p-12"
        >
          <Target size={28} className="text-gold-400 mb-5" strokeWidth={1.25} />
          <h3 className="font-display text-2xl mb-4">Our Mission</h3>
          <p className="text-cream-100/70 leading-relaxed">
            To craft leather goods of genuine, lasting quality — made honestly, priced fairly, and
            built to be used for a lifetime rather than a season.
          </p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-leather-950 text-cream-100 p-10 md:p-12"
        >
          <Compass size={28} className="text-gold-400 mb-5" strokeWidth={1.25} />
          <h3 className="font-display text-2xl mb-4">Our Vision</h3>
          <p className="text-cream-100/70 leading-relaxed">
            To become one of the most trusted names in premium leather manufacturing, recognised
            worldwide for authenticity, craftsmanship, and export reliability.
          </p>
        </motion.div>
      </section>

      {/* Why Trust Us */}
      <section className="bg-charcoal-950 text-cream-100 py-24 text-center">
        <div className="container-max max-w-2xl mx-auto">
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-gold-400 uppercase tracking-[0.25em] text-xs mb-4">
            Why Trust Leathertique Impex
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl mb-6"
          >
            Authenticity You Can See, Quality You Can Feel
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-cream-100/70 leading-relaxed mb-10"
          >
            We stand behind every piece we manufacture. From full-grain leather sourcing to final
            inspection, nothing leaves our workshop unless it meets the standard we'd want for
            ourselves.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <Link to="/shop">
              <Button variant="gold" size="lg">
                Explore Our Collection <ArrowRight size={16} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
