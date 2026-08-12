import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ open, onClose, title, children, maxWidth = 'max-w-lg' }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] bg-charcoal-950/60 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className={`bg-white w-full ${maxWidth} max-h-[90vh] overflow-y-auto rounded`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal-900/10 sticky top-0 bg-white">
            <h2 className="font-display text-lg text-charcoal-900">{title}</h2>
            <button onClick={onClose} aria-label="Close" className="text-charcoal-700/60 hover:text-charcoal-900">
              <X size={20} />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Modal;
