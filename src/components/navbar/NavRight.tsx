import NotificationButton from "@/components/navbar/NotificationButton";
import AvatarButton from "@/components/navbar/AvatarButton";

const NavRight = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <NotificationButton />
      <AvatarButton />
    </div>
  );
};

export default NavRight;
