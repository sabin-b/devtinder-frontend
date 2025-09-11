import { Button } from "@/components/ui/button";
import UserListItem from "@/components/UserListItem";
import useConnections from "@/hooks/manage/useConnections";
import { cn } from "@/lib/utils";
import { Frown, Loader, UserSearch } from "lucide-react";
import { Link } from "react-router-dom";

export default function Connections() {
  const { connections, isLoading, isError, failureReason } = useConnections();
  return (
    <section
      className={cn("min-svh flex-1 flex flex-col", {
        "items-center justify-center": connections
          ? connections?.length < 0
          : isLoading,
      })}
    >
      {isLoading && <Loader className="animate-spin size-10 text-green-500" />}
      {isError && (
        <div className="flex flex-col items-center gap-y-2">
          <Frown className="size-6 md:size-8" />
          <h4 className="text-base md:text-xl">
            {failureReason?.message || "something went wrong!"}
          </h4>
        </div>
      )}
      {connections && connections.length < 0 && (
        <div className="flex flex-col items-center gap-y-3">
          <Frown className="size-6 md:size-8" />
          <h4 className="text-base md:text-xl">{"No connections Found"}</h4>
          <Button size={"sm"} asChild>
            <Link to={"/"}>
              {" "}
              <UserSearch /> Find New Friends
            </Link>
          </Button>
        </div>
      )}
      <div className="container max-w-[600px] md:p-2 xl:pt-4">
        <div className="space-y-4">
          {connections?.map((data) => (
            <UserListItem key={data?._id} {...data} />
          ))}
        </div>
      </div>
    </section>
  );
}
