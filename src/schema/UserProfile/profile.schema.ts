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
    .transform((input) =>
      input ? xss(domPurify.sanitize(input)).trim() : undefined
    ),

  age: z.coerce
    .number()
    .min(18, { message: "Age must be at least 18" })
    .max(55, { message: "age must be less than 56" })
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

  image: z
    .union([
      z
        .custom<File>((file) => file instanceof File, {
          message: "Invalid file format",
        })
        .refine((file) => file.size < 2 * 1024 * 1024, {
          message: "File size should be less than 2MB",
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
          message: "Only .jpg, .jpeg, .png, and .webp files are accepted.",
        }),
      z
        .string()
        .url({ message: "Invalid image URL" })
        .transform((input) =>
          input?.trim() ? xss(domPurify.sanitize(input)).trim() : undefined
        ),
    ])
    .optional()
    .transform((input) => (input ? input : undefined)),
});

export const UpdateUserPasswordSchema = z.object({
  newPassword: z
    .string({ message: "please enter the new password" })
    .nonempty("please enter the new password")
    .min(8, { message: "password should be 8 characters long" })
    .regex(
      new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$"),
      "password must contain at least one letter, one digit, and one special character (@, $, !, %, , ?, &)."
    )
    .transform((input) => xss(domPurify.sanitize(input).trim())),
  oldPassword: z
    .string({ message: "please enter the old password" })
    .nonempty({ message: "old password is required" })
    .min(1, { message: "please enter the old password" }),
});
