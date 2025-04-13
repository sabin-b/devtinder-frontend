import React, { PropsWithChildren } from "react";

import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "./redux.provider";
import TanstackProvider from "./tanstack.provider";

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <React.Fragment>
      <ReduxProvider>
        <TanstackProvider>
          {children}
          <Toaster richColors position="top-center" closeButton />
        </TanstackProvider>
      </ReduxProvider>
    </React.Fragment>
  );
}
