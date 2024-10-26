import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen grid place-content-center px-4 sm:px-6 lg:px-8 py-8">
      <SignIn />
    </div>
  );
}
