import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMonthLabel(input: string) {
  const date = new Date(`${input}-01T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return input;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
  });
}
