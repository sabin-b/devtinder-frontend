import { Loader } from "lucide-react";

export default function LoadingPage() {
  return (
    <main className="min-h-svh flex items-center justify-center">
      <Loader className="animate-spin size-10 text-green-500" />
    </main>
  );
}
