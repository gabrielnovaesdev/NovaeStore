import React from 'react';

interface ProductCardSkeletonProps {
  count?: number;
}

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#101018] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between animate-pulse">
      {/* Top Cover Image Skeleton - Aspect 16/10 to match ProductCard exactly */}
      <div className="relative aspect-[16/10] bg-slate-200 dark:bg-white/[0.06] flex items-center justify-center p-3">
        <div className="w-12 h-12 rounded-xl bg-slate-300 dark:bg-white/10 opacity-60" />
        
        {/* Placeholder Badges */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          <div className="w-16 h-5 rounded-md bg-slate-300 dark:bg-white/10" />
        </div>
        <div className="absolute top-2.5 right-2.5">
          <div className="w-10 h-5 rounded-md bg-slate-300 dark:bg-white/10" />
        </div>
      </div>

      {/* Body Content Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Platform & Category */}
          <div className="flex items-center justify-between">
            <div className="w-20 h-4 rounded bg-slate-200 dark:bg-white/10" />
            <div className="w-14 h-4 rounded bg-slate-200 dark:bg-white/10" />
          </div>

          {/* Title */}
          <div className="w-4/5 h-5 rounded bg-slate-300 dark:bg-white/15 mt-1" />
          <div className="w-3/5 h-5 rounded bg-slate-200 dark:bg-white/10" />

          {/* Description lines */}
          <div className="space-y-1.5 pt-1">
            <div className="w-full h-3 rounded bg-slate-200 dark:bg-white/5" />
            <div className="w-5/6 h-3 rounded bg-slate-200 dark:bg-white/5" />
          </div>
        </div>

        {/* Footer with Price and Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-3">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <div className="w-12 h-3 rounded bg-slate-200 dark:bg-white/5" />
              <div className="w-24 h-7 rounded-lg bg-slate-300 dark:bg-white/15" />
            </div>
            <div className="w-10 h-4 rounded bg-slate-200 dark:bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="h-9 rounded-xl bg-slate-200 dark:bg-white/10" />
            <div className="h-9 rounded-xl bg-slate-300 dark:bg-indigo-900/40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton: React.FC<ProductCardSkeletonProps> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={`product-skeleton-${idx}`} />
      ))}
    </div>
  );
};
