import SignupForm from "@/components/auth/SignupForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircleCode } from "lucide-react";

export default function SignUp() {
  return (
    <main className="min-h-svh h-full flex  justify-center items-center">
      <section className=" w-full p-4 sm:p-0 sm:min-w-sm max-w-sm flex flex-col gap-y-6">
        <div className="flex flex-row items-center justify-center gap-x-2">
          <MessageCircleCode className="size-8 md:size-8 xl:size-10 text-green-500" />
          <h4 className="font-medium select-none  text-white/90  text-2xl  xl:text-3xl">
            DevTinder
          </h4>
        </div>
        <Card className="bg-slate-800">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
