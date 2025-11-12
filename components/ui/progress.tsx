"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-slate-100",
        className,
      )}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <div
        className="h-full w-full origin-left bg-gradient-primary transition-transform duration-300"
        style={{ transform: `scaleX(${Math.min(Math.max(value, 0), 100) / 100})` }}
      />
    </div>
  ),
);
Progress.displayName = "Progress";

export { Progress };

