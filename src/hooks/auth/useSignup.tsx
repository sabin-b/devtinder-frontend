import axiosInstance from "@/config/axios.config";
import { tanstackThrowError } from "@/lib/utils";
import { SignUpInputs } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { tanstackKeys } from "../tanstack.keys";

export default function useSignup() {
  const {
    mutate: signUp,
    isPending: isLoading,
    failureReason,
    isError,
  } = useMutation({
    mutationKey: [tanstackKeys.signUp],
    mutationFn: async (data: SignUpInputs) => {
      try {
        const response = await axiosInstance.post("/auth/signup", data);
        return response.data;
      } catch (error) {
        tanstackThrowError(error);
      }
    },
  });

  return { signUp, isLoading, failureReason, isError };
}
