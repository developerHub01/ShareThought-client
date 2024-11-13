import Link from "next/link";
import NotificationCardCTA from "@/components/actions/NotificationCardCTA";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const Notification = () => {
  const imgUrl =
    "https://images.unsplash.com/photo-1731000892655-5a0d52e8a43c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="w-full flex">
      {/* that span will show if that notification is not read */}
      <span className="w-1 bg-primary flex-shrink-0" />
      <div className="w-full flex gap-2 justify-between p-2.5 px-3 sm:p-3 bg-transparent hover:bg-accent">
        <Link href="/" className="flex gap-2 sm:gap-3.5 justify-between items-start">
          <Avatar className="size-8 sm:size-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1.5">
            <p className="sm:text-sm font-normal line-clamp-2 text-gray-700">
              Kevin Powell uploaded: Figma&apos;s missing feature that acient
              software added decades ago
            </p>
            <span className="text-xs text-gray-400">2 days ago</span>
          </div>
          <div className="aspect-video overflow-hidden rounded-sm">
            <Image
              src={imgUrl}
              alt="Image"
              width={200}
              height={150}
              className="rounded-md object-cover"
            />
          </div>
        </Link>
        <NotificationCardCTA notificationType="POST_NOTIFICATION" />
      </div>
    </div>
  );
};

export default Notification;
