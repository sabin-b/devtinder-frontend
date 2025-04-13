import axiosInstance from "@/config/axios.config";
import { tanstackThrowError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { tanstackKeys } from "../tanstack.keys";

export default function useUpdateProfile() {
  const {
    isPending: isLoading,
    isError,
    failureReason,
    mutate: updateProfile,
  } = useMutation({
    mutationKey: [tanstackKeys.profileUpdate],
    mutationFn: async (data: FormData) => {
      try {
        const response = await axiosInstance.patch("/profile/update", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      } catch (error: unknown) {
        tanstackThrowError(error);
      }
    },
  });

  return {
    isLoading,
    isError,
    failureReason,
    updateProfile,
  };
}
