import { Skeleton } from "@/components/ui/skeleton"

export default function PortfolioLoading() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header skeleton */}
      <div className="flex flex-col items-center mb-12">
        <Skeleton className="h-12 w-3/4 max-w-md mb-4" />
        <Skeleton className="h-4 w-full max-w-2xl mb-2" />
        <Skeleton className="h-4 w-5/6 max-w-2xl mb-2" />
        <Skeleton className="h-4 w-4/6 max-w-2xl" />
      </div>

      {/* Filters skeleton */}
      <div className="mb-8 space-y-6">
        <Skeleton className="h-10 w-full mb-4" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-8 w-24" />
          ))}
        </div>
      </div>

      {/* Portfolio grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          ))}
      </div>
    </div>
  )
}
