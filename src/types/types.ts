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
