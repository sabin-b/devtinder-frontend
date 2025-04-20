import useSignup from "@/hooks/auth/useSignup";
import { signupSchema } from "@/schema/auth/signup.schema";
import { SignUpInputs } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import LoaderButton from "../LoaderButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function SignupForm() {
  // ? react hook form
  const form = useForm<SignUpInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      emailId: "",
      firstName: "",
      confirmPassword: "",
      password: "",
    },
  });
  const { handleSubmit, control } = form;

  //? show password
  const [showPassword, setShowPassword] = useState(false);

  //? make request
  const { failureReason, signUp, isError, isLoading } = useSignup();

  //? react router navigate hook
  const navigate = useNavigate();

  function handleFormValues(data: SignUpInputs) {
    signUp(data, {
      onError: (error) => {
        toast.error(
          failureReason?.message || error?.message || "something went wrong"
        );
      },
      onSuccess: ({ message }: { message: string }) => {
        toast.success(message || "Profile Creation Completed");

        //? successful creation after redirect to login page
        navigate("/login");
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleFormValues)} className="space-y-6">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>firstName</FormLabel>
              <FormControl>
                <Input type="text" placeholder="johndoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="emailId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
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
        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center justify-between">
                <FormLabel>confirmPassword</FormLabel>
              </div>
              <FormControl className="relative">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton
          btnText="Create An Account"
          isError={isError}
          isLoading={isLoading}
          type="auth"
          errorText="Creation Failed"
        />
        <div className="text-center flex flex-row gap-x-1.5 justify-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline text-sm text-white/70 underline-offset-4"
          >
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
