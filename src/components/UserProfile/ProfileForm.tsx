import { addUser, getLoggedInUser } from "@/features/user/user.slice";
import useUpdateUserProfile from "@/hooks/profile/useUpdateUserProfile";
import { makeFileToFilePathUrl } from "@/lib/utils";
import { UserProfileSchema } from "@/schema/UserProfile/profile.schema";
import { useAppDispatch } from "@/store/store";
import { IUser, ProfileCardPreview } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";
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
  const dispatch = useAppDispatch();

  const userObject = {
    firstName: loggedUser?.firstName,
    lastName: loggedUser?.lastName,
    age: loggedUser?.age,
    about: loggedUser?.about,
    gender: loggedUser?.gender,
    image: loggedUser?.image,
  };

  const form = useForm<z.infer<typeof UserProfileSchema>>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: userObject,
  });
  const { control, handleSubmit, watch } = form;

  const formValues = watch();

  // ? update query
  const { updateProfile, isLoading, isError, failureReason } =
    useUpdateUserProfile();

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
    const isSameValues =
      inputs.firstName === userObject.firstName &&
      inputs.lastName === userObject.lastName &&
      inputs.age === userObject.age &&
      inputs.gender === userObject.gender &&
      inputs.image === userObject.image &&
      inputs.about === userObject.about;

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

    //? make update
    updateProfile(formData, {
      onSuccess: (data: { message: string; user: IUser }) => {
        //? update redux state
        dispatch(addUser(data.user));
        //? show success toast
        toast.success(data.message || "profile updated");
      },
      onError: () => {
        toast.error(failureReason?.message || "profile updating failed");
      },
    });
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
