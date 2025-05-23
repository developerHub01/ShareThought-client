import Image from "next/image";
import Link from "next/link";
import PostCardCTA from "@/components/actions/PostCardCTA";
import DotIcon from "@/components/icons/DotIcon";
import { cn } from "@/lib/utils";

const ChannelPostCard = ({
  showThreeDot = true,
  className = "",
}: {
  showThreeDot?: boolean;
  className?: string;
}) => {
  const imgUrl =
    "https://images.unsplash.com/photo-1730217804424-825f12eef36f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div
      className={cn(
        "shadow-xl w-full border border-accent rounded-sm overflow-hidden",
        className
      )}
    >
      <Link href={"/"}>
        <div className="aspect-video rounded-t-sm overflow-hidden">
          <Image
            src={imgUrl}
            width={300}
            height={300}
            alt=""
            className="size-full object-cover select-none"
          />
        </div>
        <div className="p-2.5 py-3 flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold line-clamp-2 overflow-hidden text-ellipsis">
              🔴 Let&apos;s build a Full Stack E-Commerce App with NEXT.JS 15
            </h3>
            <div className="flex gap-1 text-gray-500 text-sm items-center">
              <span>1 day ago</span>
              <DotIcon />
              <span>5 min read</span>
            </div>
          </div>
          {showThreeDot && (
            <div>
              <PostCardCTA postType="CHANNEL_POST_CARD" />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
export default ChannelPostCard;
