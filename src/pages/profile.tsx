import ProfileForm from "@/components/activeUserProfile/ProfileForm";

export default function Profile() {
  return (
    <section className="min-svh flex-1 flex flex-col items-center justify-center">
      <div className="container max-w-[1000px] mx-auto p-4 rounded-md lg:p-10 bg-slate-800">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-8">
          <div>
            <ProfileForm />
          </div>
          <div className="">profile card area</div>
        </div>
      </div>
    </section>
  );
}
