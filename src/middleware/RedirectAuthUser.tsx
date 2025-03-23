import LoadingPage from "@/components/LoadingPage";
import { getLoggedInUser } from "@/features/user/user.slice";
import useProfile from "@/hooks/profile/useProfile";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RedirectAuthUser() {
  const { isError, isLoading, userData } = useProfile();
  const location = useLocation();
  const loggedInUser = useSelector(getLoggedInUser);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isError && userData !== undefined && loggedInUser !== null) {
    return <Navigate to={"/"} replace state={location} />;
  }

  return <Outlet />;
}
