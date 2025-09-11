import { getPlaceHolderImage } from "@/lib/utils";
import { Connection } from "@/types/types";

type UserListItemProps = Connection;

export default function UserListItem({
  firstName,
  lastName,
  age,
  gender,
  image,
  about,
  _id,
}: UserListItemProps) {
  const placeHolderImage = getPlaceHolderImage(gender);
  return (
    <div className="flex flex-row gap-x-4 p-4 border bg-slate-700 rounded-md border-slate-600 items-center">
      <div className="max-w-[60px] max-h-[60px]">
        <img
          src={image || placeHolderImage}
          alt=""
          className="w-full h-full object-left object-contain"
        />
      </div>
      <div className="flex-1 space-y-0.5">
        <h4 className="text-lg capitalize font-medium">
          {firstName}
          {lastName && " " + lastName}
        </h4>
        <p className="text-slate-400 text-sm">
          {age}
          {age && gender && ", "}
          {gender}
        </p>
        {about && (
          <p className="text-base line-clamp-4 hidden md:block">{about}</p>
        )}

        {/* <div className="flex flex-row gap-x-3 mt-4">
      <Button
        size={"sm"}
        className="flex items-center bg-green-600 text-white/90 hover:bg-green-700"
      >
        <Check /> Accept
      </Button>
      <Button>Reject</Button>
    </div> */}
      </div>
    </div>
  );
}
