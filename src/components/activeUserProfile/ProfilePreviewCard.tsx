import femalePlaceHolder from "@/assets/profile/female_placeholder.jpg";
import malePlaceHolder from "@/assets/profile/male_placeholder.jpeg";
import { ProfileCardPreview } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type IPreviewProfileCardProps = ProfileCardPreview;

export default function ProfilePreviewCard({
  firstName,
  lastName,
  age,
  gender,
  about,
  currentImage,
}: IPreviewProfileCardProps) {
  // ? place holder image
  const defaultImage = malePlaceHolder;
  const profileImage =
    gender === undefined
      ? defaultImage
      : gender === "male" || gender === "other"
      ? malePlaceHolder
      : femalePlaceHolder;

  return (
    <Card className="bg-slate-700 min-w-auto w-full xl:min-w-sm max-w-sm mx-auto rounded-md">
      <CardHeader className="max-h-[350px] min-h-[250px] md:min-h-[300px] lg:min-h-[300px]  h-full w-full flex">
        <img
          className="object-cover select-none [user-drag:none] [-webkit-user-drag:none] object-center rounded-md w-full h-full"
          src={currentImage || profileImage}
        />
      </CardHeader>
      <CardContent className="space-y-1">
        <CardTitle className="text-xl capitalize">
          {firstName} {lastName && lastName}
        </CardTitle>
        {(age || gender) && (
          <CardDescription className="text-base capitalize text-white/65">
            {age && age}
            {age && gender ? " , " : null}
            {gender && gender}
          </CardDescription>
        )}
        {about && (
          <CardDescription className="text-base text-white/65">
            {about}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
