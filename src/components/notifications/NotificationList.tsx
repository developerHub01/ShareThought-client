import { ScrollArea } from "@/components/ui/scroll-area";
import Notification from "@/components/notifications/Notification";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const NotificationList = () => {
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
