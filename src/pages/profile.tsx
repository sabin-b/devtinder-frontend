import PasswordUpdateForm from "@/components/UserProfile/PasswordUpdateForm";
import ProfileForm from "@/components/UserProfile/ProfileForm";
import ProfilePreviewCard from "@/components/UserProfile/ProfilePreviewCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <section className="min-svh flex-1 flex flex-col">
      <div className="container max-w-[1200px] md:p-2 rounded-md ">
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="bg-slate-800 h-10">
            <TabsTrigger className="" value="profile">
              Your Profile
            </TabsTrigger>
            <TabsTrigger value="password">Update Your Password</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="grid grid-cols-1  gap-y-6 lg:grid-cols-2 lg:gap-x-8 xl:gap-x-16 ">
              <div>
                <ProfileForm
                  handleProfileCardPreview={handleProfileCardPreview}
                />
              </div>
              <div className="flex flex-col  justify-center">
                {profileCardPreview && (
                  <ProfilePreviewCard {...profileCardPreview} />
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <div className="grid grid-cols-1  gap-y-6 lg:grid-cols-2 lg:gap-x-8 xl:gap-x-16">
              <PasswordUpdateForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
