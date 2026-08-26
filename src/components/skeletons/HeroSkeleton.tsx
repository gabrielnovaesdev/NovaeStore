import React from 'react';

export const HeroCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#11111a] border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex flex-col justify-between animate-pulse">
      <div>
        {/* Cover Skeleton */}
        <div className="relative aspect-[16/10] rounded-xl bg-slate-200 dark:bg-white/[0.06] mb-4 flex items-center justify-center">
          <div className="w-10 h-10 rounded-lg bg-slate-300 dark:bg-white/10 opacity-50" />
          <div className="absolute top-2.5 left-2.5 w-16 h-4 rounded bg-slate-300 dark:bg-white/10" />
          <div className="absolute top-2.5 right-2.5 w-10 h-4 rounded bg-slate-300 dark:bg-white/10" />
        </div>

        {/* Platform info */}
        <div className="flex items-center justify-between mb-2">
          <div className="w-14 h-3.5 rounded bg-slate-200 dark:bg-white/10" />
          <div className="w-12 h-3.5 rounded bg-slate-200 dark:bg-white/10" />
        </div>

        {/* Title */}
        <div className="w-4/5 h-5 rounded bg-slate-300 dark:bg-white/15 mb-1" />
      </div>

      {/* Pricing & Buttons */}
      <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2 mt-3">
        <div className="flex items-baseline justify-between">
          <div className="w-20 h-6 rounded bg-slate-300 dark:bg-white/15" />
          <div className="w-8 h-4 rounded bg-slate-200 dark:bg-white/10" />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-8 rounded-xl bg-slate-200 dark:bg-white/10" />
          <div className="h-8 rounded-xl bg-slate-300 dark:bg-indigo-900/40" />
        </div>
      </div>
    </div>
  );
};

export const HeroFeaturedSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {Array.from({ length: 4 }).map((_, idx) => (
        <HeroCardSkeleton key={`hero-skeleton-${idx}`} />
      ))}
    </div>
  );
};
