import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary:
    'bg-charcoal-900 text-cream-100 hover:bg-charcoal-800 border border-charcoal-900',
  gold: 'bg-gold-500 text-charcoal-950 hover:bg-gold-600 border border-gold-500',
  outline:
    'bg-transparent text-charcoal-900 border border-charcoal-900 hover:bg-charcoal-900 hover:text-cream-100',
  ghost: 'bg-transparent text-charcoal-900 hover:bg-charcoal-900/5 border border-transparent',
  danger: 'bg-red-700 text-cream-100 hover:bg-red-800 border border-red-700',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const Button = forwardRef(
  ({ variant = 'primary', size = 'md', loading = false, disabled, className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center gap-2 tracking-wide uppercase font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
