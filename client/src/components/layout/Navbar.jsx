import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Search, User, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../context/cartStore';
import { useAuthStore } from '../../context/authStore';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const itemCount = useCartStore((s) => s.itemCount());
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const submitSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
      setSearchTerm('');
    }
  };

  const linkClass = ({ isActive }) =>
    `relative text-sm tracking-wide uppercase transition-colors duration-300 py-1 ${
      isActive ? 'text-gold-500' : 'text-cream-100/85 hover:text-gold-400'
    }`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-charcoal-950/95 backdrop-blur-sm shadow-lg shadow-black/20' : 'bg-charcoal-950/70 backdrop-blur-sm'
      }`}
    >
      <nav className="container-max flex items-center justify-between h-20" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src="/logo.png" alt="" className="h-11 w-11 md:h-12 md:w-12 object-contain" />
          <span className="font-display text-lg md:text-2xl tracking-[0.15em] text-cream-100 leading-none">
            LEATHERTIQUE <span className="text-gold-500">IMPEX</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <button
            aria-label="Search products"
            onClick={() => setSearchOpen(true)}
            className="text-cream-100 hover:text-gold-400 transition-colors"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link
            to="/account"
            aria-label={user ? 'My account' : 'Login or register'}
            className="text-cream-100 hover:text-gold-400 transition-colors hidden sm:block"
          >
            <User size={20} strokeWidth={1.5} />
          </Link>
          <Link
            to="/cart"
            aria-label={`Cart, ${itemCount} items`}
            className="relative text-cream-100 hover:text-gold-400 transition-colors"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-500 text-charcoal-950 text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(true)}
            className="text-cream-100 hover:text-gold-400 transition-colors lg:hidden"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-charcoal-950/95 backdrop-blur-sm flex items-start justify-center"
            onClick={() => setSearchOpen(false)}
          >
            <motion.form
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={submitSearch}
              className="w-full max-w-2xl mt-28 px-6"
            >
              <div className="flex items-center gap-4 border-b border-gold-500/50 pb-4">
                <Search size={22} className="text-gold-500 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for jackets, bags, wallets..."
                  className="flex-1 bg-transparent text-cream-100 placeholder:text-cream-100/40 text-lg md:text-2xl font-display outline-none"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => setSearchOpen(false)}
                  className="text-cream-100/70 hover:text-cream-100"
                >
                  <X size={22} />
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-[70] bg-charcoal-950 flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between h-20 container-max">
              <span className="font-display text-lg tracking-widest text-cream-100">MENU</span>
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="text-cream-100">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-1 px-6 mt-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block py-4 text-2xl font-display border-b border-cream-100/10 ${
                        isActive ? 'text-gold-500' : 'text-cream-100'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.32 }}>
                <Link
                  to="/account"
                  onClick={() => setMobileOpen(false)}
                  className="block py-4 text-2xl font-display text-cream-100 border-b border-cream-100/10"
                >
                  {user ? 'My Account' : 'Login / Register'}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
