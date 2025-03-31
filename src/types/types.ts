import { UserProfileSchema } from "@/schema/activeUserProfile/profile.schema";
import { z } from "zod";

export enum Gender {
  "Male" = "male",
  "FeMale" = "female",
  "Other" = "other",
}

export interface IUser {
  firstName: string;
  lastName?: string;
  emailId: string;
  imageUrl?: string;
  age?: number;
  gender?: Gender;
  about?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ProfileCardPreview = Omit<
  z.infer<typeof UserProfileSchema>,
  "imageUrl"
> & { currentImage?: string };
