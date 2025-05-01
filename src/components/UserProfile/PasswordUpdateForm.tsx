import useUpdateUserPassword from "@/hooks/profile/useUpdatePassword";
import { UpdateUserPasswordSchema } from "@/schema/UserProfile/profile.schema";
import { UpdateUserPassword } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

export default function PasswordUpdateForm() {
  // ? react hookform
  const form = useForm({
    resolver: zodResolver(UpdateUserPasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });
  const { handleSubmit, control } = form;

  //? tanstack handler
  const { isError, isLoading, failureReason, updateUserPassword } =
    useUpdateUserPassword();

  //? form handler
  function handleFormSubmit(data: UpdateUserPassword) {
    updateUserPassword(data, {
      onSuccess: (data: { message: string }) => {
        //? show success toast
        toast.success(data.message || "password updated");
      },
      onError: () => {
        toast.error(failureReason?.message || "password updation failed");
      },
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
        <FormField
          control={control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="enter the new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input placeholder="enter the old password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton
          type="profile"
          btnText="Save Changes"
          errorText="Updation Failed"
          isError={isError}
          isLoading={isLoading}
        />
      </form>
    </Form>
  );
}
