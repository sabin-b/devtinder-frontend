import LoadingPage from "@/components/LoadingPage";
import useProfile from "@/hooks/profile/useProfile";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RedirectAuthUser() {
  const { isError, isLoading, activeUser } = useProfile();
  const location = useLocation();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isError && activeUser !== undefined) {
    return <Navigate to={"/"} replace state={location} />;
  }

  return <Outlet />;
}
