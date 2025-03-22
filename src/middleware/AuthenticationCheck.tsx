import LoadingPage from "@/components/LoadingPage";
import useProfile from "@/hooks/profile/useProfile";
import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function AuthenticationCheck({ children }: PropsWithChildren) {
  const location = useLocation();
  const { isError, isLoading, activeUser } = useProfile();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError && activeUser === undefined) {
    return <Navigate to={"/login"} replace state={location} />;
  }

  return children;
}
