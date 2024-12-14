"use client";

import NotificationButton from "@/components/navbar/right/notification/NotificationButton";
import AvatarButton from "@/components/navbar/right/avatar/AvatarButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoginWrapper from "@/components/navbar/right/login/LoginWrapper";
import useIsStudio from "@/hooks/use-is-studio";
import { Plus as AddIcon } from "lucide-react";

const NavRight = () => {
  const showLoginOption = false;

  return (
    <div className="flex justify-center items-center gap-3 sm:gap-4">
      {showLoginOption ? <AuthButtonList /> : <AuthenticatedUserButtonList />}
    </div>
  );
};

const AuthButtonList = () => {
  return (
    <>
      <Link href="?login=true">
        <Button>Login</Button>
      </Link>
      <LoginWrapper />
    </>
  );
};

const AuthenticatedUserButtonList = () => {
  const isStudio = useIsStudio();

  return (
    <>
      {isStudio && (
        <Link href={"/"}>
          <Button size="sm">
            <AddIcon />
            <span className="hidden sm:block">Create Post</span>
          </Button>
        </Link>
      )}
      <NotificationButton />
      <AvatarButton />
    </>
  );
};

export default NavRight;
