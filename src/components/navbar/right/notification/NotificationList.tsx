"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Notification from "@/components/navbar/right/notification/Notification";
import useIsStudio from "@/hooks/use-is-studio";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const NotificationList = () => {
  const isStudio = useIsStudio();

  console.log({ isStudio });

  return (
    <ScrollArea className="w-full h-full">
      <div>
        {tags.map((tag) => (
          <Notification key={tag} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default NotificationList;
