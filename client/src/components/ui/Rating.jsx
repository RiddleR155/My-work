import { Star } from 'lucide-react';

const Rating = ({ value = 0, count, size = 14 }) => {
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${value} out of 5`}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={star <= Math.round(value) ? 'fill-gold-500 text-gold-500' : 'fill-none text-charcoal-700/30'}
          />
        ))}
      </div>
      {typeof count === 'number' && (
        <span className="text-xs text-charcoal-700/70">({count})</span>
      )}
    </div>
  );
};

export default Rating;
