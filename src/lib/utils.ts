import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function tanstackThrowError(err: unknown) {
  const { message } = err as unknown as Error;
  throw new Error(message);
}
