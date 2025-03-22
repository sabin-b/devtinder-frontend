import domPurify from "dompurify";
import xss from "xss";
import * as z from "zod";

export const LoginSchema = z
  .object({
    emailId: z
      .string({ message: "please enter the email" })
      .min(1, { message: "please enter the email" })
      .email({ message: "please enter the valid email" })
      .transform((input) =>
        xss(domPurify.sanitize(input)).trim().toLowerCase()
      ),
    password: z
      .string({ message: "please enter the password" })
      .min(1, { message: "please enter the password" })
      .transform((input) => xss(domPurify.sanitize(input).trim())),
  })
  .refine((value) => (value.password.length > 0 ? true : false), {
    message: "please enter valid password",
    path: ["password"],
  });
