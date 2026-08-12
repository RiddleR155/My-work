export const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-charcoal-900/10 rounded ${className}`} />
);

export const ProductCardSkeleton = () => (
  <div className="flex flex-col gap-3">
    <Skeleton className="aspect-[3/4] w-full" />
    <Skeleton className="h-3 w-2/3" />
    <Skeleton className="h-4 w-1/3" />
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);
