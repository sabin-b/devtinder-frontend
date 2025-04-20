import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

interface ILoaderButtonProps {
  isLoading: boolean;
  isError: boolean;
  btnText: string;
  loadingText?: string;
  errorText?: string;
  type: "auth" | "profile";
}

export default function LoaderButton({
  btnText,
  isLoading,
  isError,
  loadingText = "Please Wait",
  errorText = "failed",
  type,
}: ILoaderButtonProps) {
  return (
    <Button
      className={cn("w-full rounded-md text-center  cursor-pointer", {
        "bg-red-500 text-white/90": isError,
        "bg-green-600 text-white/90 hover:bg-green-700": type === "profile",
      })}
      type="submit"
    >
      {!isError && isLoading && (
        <React.Fragment>
          <span className="flex items-center gap-x-2">
            <Loader className="animate-spin size-4.5" /> {loadingText}
          </span>
        </React.Fragment>
      )}
      {isError && <React.Fragment>{errorText}</React.Fragment>}
      {!isLoading && !isError && <React.Fragment>{btnText}</React.Fragment>}
    </Button>
  );
}
