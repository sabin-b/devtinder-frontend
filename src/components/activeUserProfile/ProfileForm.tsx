import { getLoggedInUser } from "@/features/user/user.slice";
import { makeFileToFilePathUrl } from "@/lib/utils";
import { UserProfileSchema } from "@/schema/activeUserProfile/profile.schema";
import { ProfileCardPreview } from "@/types/types";
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
  handleProfileCardPreview: (formInputs: ProfileCardPreview) => void;
}

export default function ProfileForm({
  handleProfileCardPreview,
}: IProfileFormProps) {
  // * loggedInUser details from redux store
  const loggedUser = useSelector(getLoggedInUser);

  const userObject = {
    firstName: loggedUser?.firstName,
    lastName: loggedUser?.lastName,
    age: loggedUser?.age,
    about: loggedUser?.about,
    gender: loggedUser?.gender,
    image: loggedUser?.imageUrl,
  };

  const form = useForm<z.infer<typeof UserProfileSchema>>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: userObject,
  });
  const { control, handleSubmit, watch } = form;

  const formValues = watch();

  //? update userPreview card
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      (async () => {
        const profileImage = formValues.image;
        let currentImage: string | undefined;
        if (profileImage instanceof File) {
          currentImage = (await makeFileToFilePathUrl(profileImage)) as string;
        } else if (typeof profileImage === "string") {
          currentImage = profileImage;
        }
        handleProfileCardPreview({ currentImage, ...formValues });
      })();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [formValues, handleProfileCardPreview]);

  //* handle form submission
  function handleFormSubmission(inputs: z.infer<typeof UserProfileSchema>) {
    //? submission with same value just return
    const isSameValues = JSON.stringify(inputs) === JSON.stringify(userObject);
    if (isSameValues) return;

    //? make a request
    const formData = new FormData();
    // ? removing undefined values
    Object.entries(inputs)
      .filter(([, value]) => value !== undefined)
      .forEach(([key, value]) =>
        key === "age"
          ? formData.append(key, value.toString())
          : formData.append(key, value as string | File)
      );
    console.log(Object.fromEntries(formData));
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
                <Input type="text" placeholder="john doe" {...field} />
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="choose the profile image"
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
          className="w-full cursor-pointer bg-green-600 text-white/90 hover:bg-green-700"
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
