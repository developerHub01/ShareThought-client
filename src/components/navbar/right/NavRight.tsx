import NotificationButton from "@/components/navbar/right/notification/NotificationButton";
import AvatarButton from "@/components/navbar/right/avatar/AvatarButton";

const NavRight = () => {
  return (
    <div className="flex justify-center items-center gap-3 sm:gap-4">
      <NotificationButton />
      <AvatarButton />
    </div>
  );
};

export default NavRight;
