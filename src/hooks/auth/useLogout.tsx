import axiosInstance from "@/config/axios.config";
import { removeUser } from "@/features/user/user.slice";
import { tanstackThrowError } from "@/lib/utils";
import { useAppDispatch } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { tanstackKeys } from "../tanstack.keys";

export default function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate: logOut } = useMutation({
    mutationKey: [tanstackKeys.logout],
    mutationFn: async () => {
      try {
        const response = await axiosInstance.post("/auth/signout", {});
        //? return response
        return response.data;
      } catch (error) {
        tanstackThrowError(error);
      }
    },
    onSuccess: () => {
      //? remove user from state
      dispatch(removeUser());
      //? redirect login page
      navigate("/login", { replace: true });
    },
  });

  return { logOut };
}
