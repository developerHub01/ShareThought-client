import { Button } from "@/components/ui/button";
import { Bell as NotificationIcon } from "lucide-react";
import NotificationPopover from "@/components/navbar/right/notification/NotificationPopover";
import { Badge } from "@/components/ui/badge";

const NotificationButton = () => {
  const newNotificationCount = 100;
  return (
    <NotificationPopover>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="rounded-full flex-shrink-0 relative"
      >
        {newNotificationCount > 0 && (
          <Badge
            className="absolute p-[2.5px] text-[10px] font-light top-0 right-0 translate-x-1/2 flex-shrink-0 leading-none w-7 flex justify-center items-center line-clamp-1 overflow-hidden"
            size={"sm"}
          >
            {newNotificationCount >= 10 ? "10+" : newNotificationCount}
          </Badge>
        )}
        <NotificationIcon size={22} strokeWidth={1.5} />
      </Button>
    </NotificationPopover>
  );
};

export default NotificationButton;
