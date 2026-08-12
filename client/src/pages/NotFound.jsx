import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home as HomeIcon } from 'lucide-react';
import Seo from '../components/common/Seo';
import Button from '../components/ui/Button';

const NotFound = () => (
  <div className="min-h-[75vh] flex items-center justify-center bg-cream-100 px-6">
    <Seo title="Page Not Found" />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-md"
    >
      <p className="font-display text-8xl md:text-9xl text-leather-800/20 leading-none mb-4">404</p>
      <h1 className="font-display text-2xl md:text-3xl text-charcoal-900 mb-4">
        This Page Has Wandered Off the Trail
      </h1>
      <p className="text-charcoal-700/70 mb-10">
        The page you're looking for doesn't exist or may have been moved. Let's get you back to
        our collection.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          <HomeIcon size={16} />
          Back to Home
        </Button>
      </Link>
    </motion.div>
  </div>
);

export default NotFound;
