import {
  UpdateUserPasswordSchema,
  UserProfileSchema,
} from "@/schema/UserProfile/profile.schema";
import { signupSchema } from "@/schema/auth/signup.schema";
import { z } from "zod";

export enum Gender {
  "Male" = "male",
  "FeMale" = "female",
  "Other" = "other",
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName?: string;
  emailId: string;
  image?: string;
  age?: number;
  gender?: Gender;
  about?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ProfileCardPreview = Omit<
  z.infer<typeof UserProfileSchema>,
  "image"
> & { currentImage?: string };

/**
 * ? types refer from zod schemas
 *
 * * login
 * * signup
 */

export type SignUpInputs = z.infer<typeof signupSchema>;

/**
 * ? types refer updatePasswordSchema
 *
 * * updatePassword
 */

export type UpdateUserPassword = z.infer<typeof UpdateUserPasswordSchema>;
