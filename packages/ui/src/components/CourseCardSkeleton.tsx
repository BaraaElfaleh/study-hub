import React from "react";

/** Core building block for loading placeholders */
const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    aria-hidden="true"
    className={`animate-pulse bg-text-muted/10 ${className}`}
    {...props}
  />
));
Skeleton.displayName = "Skeleton";

/**
 * Pre‑composed skeleton layout that mimics a course card.
 * Adjust the grid container as needed – the example uses a single card.
 */
const CourseCardSkeleton = () => (
  <div className="bg-brand-surface rounded-premium shadow-deep overflow-hidden">
    {/* Fake course thumbnail */}
    <Skeleton className="w-full h-40 rounded-none" />
    <div className="p-4 space-y-3">
      {/* Title */}
      <Skeleton className="h-5 w-3/4 rounded-md" />
      {/* Description line 1 */}
      <Skeleton className="h-4 w-full rounded-md" />
      {/* Description line 2 */}
      <Skeleton className="h-4 w-2/3 rounded-md" />
    </div>
  </div>
);

export { Skeleton, CourseCardSkeleton };
export default Skeleton;