import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SignIn />
    </div>
  );
}
