import ProfileForm from "@/components/activeUserProfile/ProfileForm";
import ProfilePreviewCard from "@/components/activeUserProfile/ProfilePreviewCard";
import { ProfileCardPreview } from "@/types/types";
import { useCallback, useState } from "react";

export default function Profile() {
  const [profileCardPreview, setProfileCardPreview] =
    useState<ProfileCardPreview | null>(null);

  console.log(profileCardPreview);

  const handleProfileCardPreview = useCallback(
    (formInputs: ProfileCardPreview) => {
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
            {profileCardPreview && (
              <ProfilePreviewCard {...profileCardPreview} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
