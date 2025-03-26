"use client";

import NotificationButton from "@/components/navbar/right/notification/NotificationButton";
import AvatarButton from "@/components/navbar/right/avatar/AvatarButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LoginWrapper from "@/components/navbar/right/login/LoginWrapper";
import useIsStudio from "@/hooks/use-is-studio";
import { AddIcon, SquarePen as CreateIcon, LucideIcon } from "@/lib/icons";

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
      {isStudio && <CreateButtonPopover />}
      <NotificationButton />
      <AvatarButton />
    </>
  );
};

const CreateButtonPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size={"sm"}>
          <AddIcon size={20} />
          <span className="hidden sm:block">Create</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-1 w-fit p-1" align="end">
        <CreateButton href="/" Icon={CreateIcon} label="Create Blog Post" />
        <CreateButton
          href="/"
          Icon={CreateIcon}
          label="Create Community Post"
        />
      </PopoverContent>
    </Popover>
  );
};

interface CreateButtonProps {
  href: string;
  Icon: LucideIcon;
  label: string;
}

const CreateButton = ({ href = "/", Icon, label }: CreateButtonProps) => {
  return (
    <Link href={href} className="w-full">
      <Button variant={"ghost"} size={"sm"} className="w-full justify-start">
        <Icon size={20} />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

export default NavRight;
