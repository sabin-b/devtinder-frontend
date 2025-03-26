import { getLoggedInUser } from "@/features/user/user.slice";
import { UserProfileSchema } from "@/schema/activeUserProfile/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface IProfileFormProps {
  handleProfileCardPreview: (
    formInputs: z.infer<typeof UserProfileSchema>
  ) => void;
}

export default function ProfileForm({
  handleProfileCardPreview,
}: IProfileFormProps) {
  // * loggedInUser  from redux store
  const loggedUser = useSelector(getLoggedInUser);

  const form = useForm<z.infer<typeof UserProfileSchema>>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      firstName: loggedUser?.firstName,
      lastName: loggedUser?.lastName,
      age: loggedUser?.age,
      about: loggedUser?.about,
      gender: loggedUser?.gender,
      imageUrl: loggedUser?.imageUrl,
    },
  });
  const { control, handleSubmit, watch } = form;

  const formValues = watch();

  //? update userPreview card
  useEffect(() => {
    const timoutId = setTimeout(
      () => handleProfileCardPreview(formValues),
      300
    );
    return () => clearTimeout(timoutId);
  }, [formValues, handleProfileCardPreview]);

  //* handle form submission
  function handleFormSubmission(inputs: z.infer<typeof UserProfileSchema>) {
    console.log(inputs);
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmission)}>
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
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>lastName</FormLabel>
              <FormControl>
                <Input type="text" placeholder="doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={18}
                  placeholder="ex:18,19"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select the gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-slate-700">
                  <SelectItem className="" value="male">
                    Male
                  </SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="imageurl.com"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>about</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full cursor-pointer bg-green-500 text-white/90 hover:bg-green-600"
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
