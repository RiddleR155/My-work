import { Minus, Plus } from 'lucide-react';

const QuantitySelector = ({ value, onChange, max = 99, min = 1 }) => (
  <div className="inline-flex items-center border border-charcoal-900/20">
    <button
      type="button"
      aria-label="Decrease quantity"
      onClick={() => onChange(Math.max(min, value - 1))}
      disabled={value <= min}
      className="w-10 h-10 flex items-center justify-center text-charcoal-900 hover:bg-charcoal-900/5 disabled:opacity-30 disabled:cursor-not-allowed"
    >
      <Minus size={14} />
    </button>
    <span className="w-12 text-center text-sm font-medium" aria-live="polite">
      {value}
    </span>
    <button
      type="button"
      aria-label="Increase quantity"
      onClick={() => onChange(Math.min(max, value + 1))}
      disabled={value >= max}
      className="w-10 h-10 flex items-center justify-center text-charcoal-900 hover:bg-charcoal-900/5 disabled:opacity-30 disabled:cursor-not-allowed"
    >
      <Plus size={14} />
    </button>
  </div>
);

export default QuantitySelector;
