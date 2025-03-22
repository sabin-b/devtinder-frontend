import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { PropsWithChildren } from "react";

export default function TanstackProvider({ children }: PropsWithChildren) {
  const queryClient = React.useMemo(() => new QueryClient(), []);
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
