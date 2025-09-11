import axiosInstance from "@/config/axios.config";
import { tanstackThrowError } from "@/lib/utils";
import { Connection } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { tanstackKeys } from "../tanstack.keys";

export default function useConnections() {
  const {
    data: connections,
    isError,
    isLoading,
    failureReason,
  } = useQuery<Connection[]>({
    queryKey: [tanstackKeys.manageConnections],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/user/connections");
        return response.data;
      } catch (error) {
        tanstackThrowError(error);
      }
    },
  });

  return {
    connections,
    isError,
    isLoading,
    failureReason,
  };
}
