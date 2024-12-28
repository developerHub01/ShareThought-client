import Image from "next/image";
import Link from "next/link";
import PostCardCTA from "@/components/actions/PostCardCTA";
import DotIcon from "@/components/icons/DotIcon";

const PostCard = ({ showThreeDot = true }: { showThreeDot?: boolean }) => {
  const imgUrl =
    "https://images.unsplash.com/photo-1730217804424-825f12eef36f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="shadow-xl w-full border border-accent rounded-sm overflow-hidden">
      <Link href={"/"} className="flex justify-start items-center gap-2 p-2.5">
        <div className="size-8 md:size-10 overflow-hidden aspect-square rounded-full flex-shrink-0">
          <Image
            src={imgUrl}
            width={80}
            height={80}
            alt=""
            className="size-full object-cover select-none"
          />
        </div>
        <h4 className="text-primary/80 text-sm font-semibold line-clamp-1 overflow-hidden text-ellipsis">
          Developer Hub BD
        </h4>
      </Link>
      <Link href={"/"} className="block w-full rounded-t-sm overflow-hidden">
        <Image
          src={imgUrl}
          width={300}
          height={300}
          alt=""
          className="w-full h-full object-cover"
        />
      </Link>
      <div className="p-2.5 py-3 flex justify-between gap-2">
        <Link href={"/"} className="flex flex-col gap-2">
          <h3 className="font-semibold line-clamp-2 overflow-hidden text-ellipsis">
            🔴 Let&apos;s build a Full Stack E-Commerce App with NEXT.JS 15
          </h3>
          <div className="flex gap-1 text-gray-500 text-xs sm:text-sm items-center">
            <span>1 day ago</span>
            <DotIcon />
            <span>5 min read</span>
          </div>
        </Link>
        {showThreeDot && (
          <div>
            <PostCardCTA postType="POST_CARD" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
