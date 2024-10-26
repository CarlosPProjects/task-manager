import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <UserProfile path="/user-profile" />
    </div>
  );
};

export default UserProfilePage;
