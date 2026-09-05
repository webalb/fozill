export default function GlobalLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-3 max-w-2xl">
        <div className="h-4 w-32 bg-gold/20 rounded-full" />
        <div className="h-8 w-3/4 bg-elevated rounded-lg" />
        <div className="h-4 w-full bg-surface rounded-lg" />
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-surface/40 p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 bg-elevated rounded-full" />
              <div className="h-3 w-16 bg-surface rounded-full" />
            </div>
            <div className="h-6 w-5/6 bg-elevated rounded-md" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-surface rounded" />
              <div className="h-3 w-4/5 bg-surface rounded" />
            </div>
            <div className="h-10 w-full bg-elevated/60 rounded-xl pt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
