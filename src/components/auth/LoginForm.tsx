import useLogin from "@/hooks/auth/useLogin";
import { LoginSchema } from "@/schema/auth/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      emailId: "sabinb1998sabinb@gmail.com",
      password: "sabin@1234",
    },
  });
  const { handleSubmit, control } = form;

  //? show password
  const [showPassword, setShowPassword] = useState(false);

  //? login api request
  const { login, failureReason, isPending } = useLogin();

  //? navigate
  const navigate = useNavigate();

  function handleFormValues(data: z.infer<typeof LoginSchema>) {
    login(data, {
      onSuccess: () => {
        navigate("/");
      },
      onError: () => {
        toast.error(failureReason?.message, {
          richColors: true,
          position: "top-center",
        });
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleFormValues)} className="space-y-6">
        <FormField
          control={control}
          name="emailId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="johndoe@.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center justify-between">
                <FormLabel>Password</FormLabel>
              </div>
              <FormControl className="relative">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    {...field}
                  />

                  <React.Fragment>
                    {showPassword ? (
                      <Eye
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute size-5 cursor-pointer top-1/2 -translate-y-1/2 right-2"
                      />
                    ) : (
                      <EyeOff
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute size-5 cursor-pointer top-1/2 -translate-y-1/2 right-2"
                      />
                    )}
                  </React.Fragment>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {isPending ? (
            <React.Fragment>
              <span className="flex items-center gap-x-2">
                <Loader className="animate-spin size-4.5" /> Please Wait
              </span>
            </React.Fragment>
          ) : (
            "Login"
          )}
        </Button>

        <div className="text-center flex flex-row gap-x-1.5 justify-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="hover:underline text-sm text-white/70 underline-offset-4"
          >
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
