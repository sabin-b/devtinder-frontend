import axiosInstance from "@/config/axios.config";
import { tanstackThrowError } from "@/lib/utils";
import { UpdateUserPassword } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { tanstackKeys } from "../tanstack.keys";

export default function useUpdateUserPassword() {
  const {
    isPending: isLoading,
    isError,
    mutate: updateUserPassword,
    failureReason,
  } = useMutation({
    mutationKey: [tanstackKeys.profilePasswordUpdate],
    mutationFn: async (data: UpdateUserPassword) => {
      try {
        const response = await axiosInstance.patch(
          "/profile/updatepassword",
          data
        );
        return response.data;
      } catch (error) {
        tanstackThrowError(error);
      }
    },
  });

  return {
    isLoading,
    isError,
    updateUserPassword,
    failureReason,
  };
}
