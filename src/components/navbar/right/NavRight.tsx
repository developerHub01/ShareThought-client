import NotificationButton from "@/components/navbar/right/notification/NotificationButton";
import AvatarButton from "@/components/navbar/right/avatar/AvatarButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoginWrapper from "@/components/navbar/right/login/LoginWrapper";

const NavRight = () => {
  const showLoginOption = false;

  return (
    <div className="flex justify-center items-center gap-3 sm:gap-4">
      {showLoginOption ? (
        <>
          <Link href="?login=true">
            <Button>Login</Button>
          </Link>
          <LoginWrapper />
        </>
      ) : (
        <>
          <NotificationButton />
          <AvatarButton />
        </>
      )}
    </div>
  );
};

export default NavRight;
