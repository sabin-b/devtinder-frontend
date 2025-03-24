import { Gender } from "@/types/types";
import domPurify from "dompurify";
import xss from "xss";
import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const UserProfileSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: "First name is required" })
    .min(3, { message: "First name should be at least 3 characters long" })
    .regex(/^[A-Za-z]+([ '-][A-Za-z]+)*$/, {
      message:
        "First name can only contain letters, spaces, or hyphens, and must start with a letter",
    })
    .transform((input) =>
      input ? xss(domPurify.sanitize(input)).trim() : input
    ),

  lastName: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: "Last name must be at least 1 character long",
    })
    .transform((input) =>
      input ? xss(domPurify.sanitize(input)).trim() : undefined
    ),

  age: z.coerce
    .number()
    .min(18, { message: "Age must be at least 18" })
    .optional(),

  gender: z
    .enum([Gender.Male, Gender.FeMale, Gender.Other], {
      message: "Only 'male', 'female', or 'other' are accepted",
    })
    .optional()
    .transform((input) => (input ? input : undefined)),

  about: z
    .string()
    .max(100, { message: "About section must be at most 100 characters long" })
    .optional()
    .transform((input) =>
      input?.trim() ? xss(domPurify.sanitize(input)).trim() : undefined
    ),

  imageUrl: z
    .union([
      z
        .instanceof(File)
        .refine((file) => file.size < 2 * 1024 * 1024, {
          message: "File size should be less than 2MB",
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
          message: "Only .jpg, .jpeg, .png, and .webp files are accepted.",
        }),
      z.string().url({ message: "Invalid image URL" }),
    ])
    .optional()
    .transform((input) => (input ? input : undefined)),
});
