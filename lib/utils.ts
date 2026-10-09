// Joins class names, skipping anything falsy. A small stand-in for the usual
// shadcn `cn` helper, which would pull in two packages for this one job.
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
