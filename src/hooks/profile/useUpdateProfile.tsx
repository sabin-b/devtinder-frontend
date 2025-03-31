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
      console.log(Object.fromEntries(data));
    },
  });

  return {
    isLoading,
    isError,
    failureReason,
    updateProfile,
  };
}
