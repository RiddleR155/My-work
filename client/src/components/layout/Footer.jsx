import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FacebookIcon, InstagramIcon, LinkedinIcon } from '../ui/SocialIcons';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-950 text-cream-100/80 mt-auto">
      <div className="container-max py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="" className="h-10 w-10 object-contain" />
            <h3 className="font-display text-lg tracking-[0.15em] text-cream-100 leading-none">
              LEATHERTIQUE <span className="text-gold-500">IMPEX</span>
            </h3>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Premium handcrafted leather goods, manufactured and exported with an uncompromising
            standard of quality since day one.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <a href="#" aria-label="Facebook" className="hover:text-gold-500 transition-colors">
              <FacebookIcon size={18} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gold-500 transition-colors">
              <InstagramIcon size={18} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gold-500 transition-colors">
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-cream-100 uppercase tracking-wider text-sm mb-5">Navigate</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-gold-500 transition-colors">Home</Link></li>
            <li><Link to="/shop" className="hover:text-gold-500 transition-colors">Shop</Link></li>
            <li><Link to="/about" className="hover:text-gold-500 transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold-500 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-cream-100 uppercase tracking-wider text-sm mb-5">Account</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/account" className="hover:text-gold-500 transition-colors">Login / Register</Link></li>
            <li><Link to="/cart" className="hover:text-gold-500 transition-colors">My Cart</Link></li>
            <li><Link to="/shop" className="hover:text-gold-500 transition-colors">All Products</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-cream-100 uppercase tracking-wider text-sm mb-5">Get in Touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-500" />
              <span>Sialkot Export Processing Zone, Punjab, Pakistan</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-gold-500" />
              <span>+92 300 1234567</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-gold-500" />
              <span>info@leathertiqueimpex.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-100/10 py-6">
        <div className="container-max flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream-100/50">
          <p>&copy; {year} Leathertique Impex. All rights reserved.</p>
          <p>Crafted in Leather. Built for Legacy.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
