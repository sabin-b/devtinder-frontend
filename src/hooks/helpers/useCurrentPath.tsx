import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export default function useCurrentPath() {
  const { pathname } = useLocation();
  const currentPathName = useMemo(() => pathname, [pathname]);

  return currentPathName;
}
