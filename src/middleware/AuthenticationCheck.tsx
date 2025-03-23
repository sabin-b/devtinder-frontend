import LoadingPage from "@/components/LoadingPage";
import { getLoggedInUser } from "@/features/user/user.slice";
import useProfile from "@/hooks/profile/useProfile";
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function AuthenticationCheck({ children }: PropsWithChildren) {
  const location = useLocation();
  const { isError, isLoading, userData } = useProfile();
  const loggedInUser = useSelector(getLoggedInUser);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError && userData === undefined && loggedInUser === null) {
    return <Navigate to={"/login"} replace state={location} />;
  }

  return children;
}
