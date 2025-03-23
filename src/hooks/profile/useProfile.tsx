import axiosInstance from "@/config/axios.config";
import { addUser, getLoggedInUser } from "@/features/user/user.slice";
import { tanstackThrowError } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { IUser } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { tanstackKeys } from "../tanstack.keys";

export default function useProfile() {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(getLoggedInUser);

  const {
    data: userData,
    isLoading,
    failureReason,
    isError,
  } = useQuery<IUser>({
    queryKey: [tanstackKeys.profileView],
    queryFn: async function () {
      try {
        const response = await axiosInstance.get("/profile/view");

        //? add it on redux store
        dispatch(addUser(response.data));

        return response.data;
      } catch (error: unknown) {
        tanstackThrowError(error);
      }
    },
    retry: false, //? Will retry failed requests 3 times before displaying an error
    enabled: Boolean(!currentUser),
  });

  return { userData, isError, isLoading, failureReason };
}
