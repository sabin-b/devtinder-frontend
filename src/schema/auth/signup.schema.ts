import domPurify from "dompurify";
import xss from "xss";
import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z
      .string({ message: "please enter the name" })
      .min(3, { message: "name must be 3 characters long" })
      .regex(
        new RegExp("^[A-Za-z]+([ '-][A-Za-z]+)*$"),
        "First name can only contain letters, spaces, or hyphens, and must start with a letter"
      )
      .transform((input) => xss(domPurify.sanitize(input)).trim()),
    emailId: z
      .string({ message: "please enter the email" })
      .email({ message: "please enter the valid email" })
      .transform((input) =>
        xss(domPurify.sanitize(input)).trim().toLowerCase()
      ),
    password: z
      .string({ message: "please enter the password" })
      .min(8, { message: "please enter the password" })
      .regex(
        new RegExp(
          "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$"
        ),
        "firstName must contain at least one letter, one digit, and one special character (@, $, !, %, , ?, &)."
      )
      .transform((input) => xss(domPurify.sanitize(input).trim())),
    confirmPassword: z
      .string({ message: "please enter the password" })
      .transform((input) => xss(domPurify.sanitize(input).trim())),
  })
  .refine((value) => (value.password.length > 0 ? true : false), {
    message: "please enter valid password",
    path: ["password"],
  })
  .refine((value) => (value.confirmPassword.length > 0 ? true : false), {
    message: "please enter valid confirmPassword",
    path: ["confirmPassword"],
  })
  .refine((val) => (val.password === val.confirmPassword ? true : false), {
    message: "confirm password not matched",
    path: ["confirmPassword"],
  });
