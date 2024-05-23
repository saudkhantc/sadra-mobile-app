import { Profile } from "@/components/profile/profile";

export default function ProfilePage() {
  return (
    <div className="flex flex-col p-6">
      <div className="border-b">
        <h1 className="font-semibold text-4xl">User Info</h1>
      </div>
      <Profile />
    </div>
  );
}
