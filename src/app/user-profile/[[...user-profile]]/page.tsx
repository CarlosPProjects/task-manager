import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <UserProfile path="/user-profile" />
    </div>
  );
};

export default UserProfilePage;
