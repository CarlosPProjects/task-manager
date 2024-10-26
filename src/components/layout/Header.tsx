"use client";

import { LayoutList, LogOut, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@clerk/nextjs";
import { cn, getUserInitials } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  return (
    <header
      className={cn(
        "bg-white shadow-sm transition-all duration-300 translate-y-0",
        !isSignedIn && "-translate-y-full -mb-20"
      )}
    >
      {!isSignedIn ? (
        <div className="h-[80px]" />
      ) : (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Avatar className="size-8 mr-4">
                <AvatarImage src={user.imageUrl} alt="User" />
                <AvatarFallback>
                  {user.fullName ? getUserInitials(user.fullName) : ""}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {user.fullName}
                </h2>
                <p className="text-sm text-gray-500">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  router.push("/");
                }}
              >
                <LayoutList className="size-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => router.push("/user-profile")}
              >
                <Settings className="size-5" />
                <span className="sr-only">Settings</span>
              </Button>

              <SignOutButton>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="size-5" />
                  <span className="sr-only">Logout</span>
                </Button>
              </SignOutButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
