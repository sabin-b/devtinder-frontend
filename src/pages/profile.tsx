import ProfileForm from "@/components/activeUserProfile/ProfileForm";
import ProfilePreviewCard from "@/components/activeUserProfile/ProfilePreviewCard";
import { ProfileCardPreview } from "@/types/types";
import { useCallback, useState } from "react";

export default function Profile() {
  const [profileCardPreview, setProfileCardPreview] =
    useState<ProfileCardPreview | null>(null);

  const handleProfileCardPreview = useCallback(
    (formInputs: ProfileCardPreview) => {
      setProfileCardPreview((prev) =>
        JSON.stringify(prev) !== JSON.stringify(formInputs) ? formInputs : prev
      );
    },
    []
  );
  return (
    <section className="min-svh flex-1 flex flex-col  justify-center">
      <div className="container max-w-[1200px] md:p-2 rounded-md xl:p-6 ">
        <div className="grid grid-cols-1  gap-y-6 lg:grid-cols-2 lg:gap-x-6">
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
