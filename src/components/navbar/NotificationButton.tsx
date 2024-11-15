import { Button } from "@/components/ui/button";
import { Bell as NotificationIcon } from "lucide-react";
import NotificationPopover from "@/components/navbar/NotificationPopover";

const NotificationButton = () => {
  return (
    <NotificationPopover>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="rounded-full flex-shrink-0"
      >
        <NotificationIcon size={20} strokeWidth={1.5} />
      </Button>
    </NotificationPopover>
  );
};

export default NotificationButton;
