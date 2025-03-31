import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function tanstackThrowError(err: unknown) {
  const { message } = err as unknown as Error;
  throw new Error(message);
}

export function makeFileToFilePathUrl(
  file: File
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    //? make converting file to url
    reader.readAsDataURL(file);

    // ? onload returning url
    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (err) => {
      reject(err);
    };
  });
}
