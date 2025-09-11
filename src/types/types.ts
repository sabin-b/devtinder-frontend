import {
  UpdateUserPasswordSchema,
  UserProfileSchema,
} from "@/schema/UserProfile/profile.schema";
import { signupSchema } from "@/schema/auth/signup.schema";
import { LucideIcon } from "lucide-react";
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

/***
 * nav link
 *
 */

export type SideBarNavLink = {
  name: string;
  href: string;
  Icon: LucideIcon;
};

/***
 * user Profile Update Schema
 */
export type UserProfile = z.infer<typeof UserProfileSchema>;

/***
 * connection
 */

export type Connection = {
  _id: string;
  firstName: string;
  lastName?: string;
  emailId: string;
  image?: string;
  age?: string;
  gender?: Gender;
  about?: string;
};
