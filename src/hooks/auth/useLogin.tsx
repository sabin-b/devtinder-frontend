import axiosInstance from "@/config/axios.config";
import { tanstackThrowError } from "@/lib/utils";
import { LoginSchema } from "@/schema/auth/login.schema";
import { IUser } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { tanstackKeys } from "../tanstack.keys";

interface IuseLoginReturnType {
  message: string;
  data: IUser;
}

export default function useLogin() {
  const {
    isPending,
    isError,
    failureReason,
    mutate: login,
  } = useMutation({
    mutationKey: [tanstackKeys.login],
    mutationFn: async (data: z.infer<typeof LoginSchema>) => {
      try {
        const response = await axiosInstance.post<IuseLoginReturnType>(
          "/auth/signin",
          data
        );

        return response.data;
      } catch (error: unknown) {
        tanstackThrowError(error);
      }
    },
  });

  return {
    isError,
    isPending,
    failureReason,
    login,
  };
}
