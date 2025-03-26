import ProfileForm from "@/components/activeUserProfile/ProfileForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserProfileSchema } from "@/schema/activeUserProfile/profile.schema";
import { useCallback, useState } from "react";
import { z } from "zod";

export default function Profile() {
  const [profileCardPreview, setProfileCardPreview] = useState<z.infer<
    typeof UserProfileSchema
  > | null>(null);

  const handleProfileCardPreview = useCallback(
    (formInputs: z.infer<typeof UserProfileSchema>) => {
      setProfileCardPreview((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(formInputs)) {
          return formInputs;
        }
        return prev;
      });
    },
    []
  );
  return (
    <section className="min-svh flex-1 flex flex-col items-center justify-center">
      <div className="container max-w-[1000px] mx-auto p-4 rounded-md lg:p-10 bg-slate-800">
        <div className="grid grid-cols-1  gap-y-6 lg:grid-cols-2 lg:gap-x-8">
          <div>
            <ProfileForm handleProfileCardPreview={handleProfileCardPreview} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <Card className="bg-slate-700 sm:min-w-sm max-w-sm mx-auto rounded-md">
              <CardHeader className="max-h-[250px]">
                <img
                  className="object-cover w-full h-full"
                  src="https://ia601904.us.archive.org/28/items/placeholder-image//placeholder-image.jpg"
                  alt=""
                />
              </CardHeader>
              <CardContent className="space-y-1">
                <CardTitle className="text-xl capitalize">
                  {profileCardPreview?.firstName}{" "}
                  {profileCardPreview?.lastName && profileCardPreview?.lastName}
                </CardTitle>
                {(profileCardPreview?.age || profileCardPreview?.gender) && (
                  <CardDescription className="text-base capitalize text-white/65">
                    {profileCardPreview?.age}
                    {" , " + profileCardPreview?.gender}
                  </CardDescription>
                )}
                {profileCardPreview?.about && (
                  <CardDescription className="capitalize text-base text-white/65">
                    {profileCardPreview?.about}
                  </CardDescription>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
