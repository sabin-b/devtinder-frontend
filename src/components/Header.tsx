import { MessageCircleCode } from "lucide-react";

export default function Header() {
  return (
    <header className="py-4 px-4 xl:px-0 bg-slate-800">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-row items-center gap-x-2">
          <MessageCircleCode className="size-8 md:size-8 xl:size-10 text-green-500" />
          <h4 className="font-medium select-none  text-white/90 hidden md:block md:text-2xl xl:text-3xl">
            DevTinder
          </h4>
        </div>
      </div>
    </header>
  );
}
