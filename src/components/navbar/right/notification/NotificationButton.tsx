"use client";

import { Button } from "@/components/ui/button";
import { Bell as NotificationIcon } from "lucide-react";
import NotificationPopover from "@/components/navbar/right/notification/NotificationPopover";
import { Badge } from "@/components/ui/badge";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import { useRouter } from "next/navigation";

const NotificationButton = () => {
  const router = useRouter();
  const { modifyParams, buildFullPath } = useModifyQueryParams();

  const handleNavigateNotificationQuery = () =>
    router.push(buildFullPath(modifyParams("set", "notification")));

  const newNotificationCount = 100;

  return (
    <NotificationPopover>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="rounded-full flex-shrink-0 relative"
        onClick={handleNavigateNotificationQuery}
      >
        {newNotificationCount > 0 && (
          <Badge
            className="absolute p-[2.5px] text-[10px] font-light top-0 right-0 translate-x-[20%] flex-shrink-0 leading-none w-7 flex justify-center items-center line-clamp-1 overflow-hidden"
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
