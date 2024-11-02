import Image from "next/image";
import Link from "next/link";
import ChannelPostCardCTA from "@/components/actions/ChannelPostCardCTA";

const ChannelPostCard = () => {
  const imgUrl =
    "https://images.unsplash.com/photo-1730217804424-825f12eef36f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="shadow-xl w-full max-w-sm border border-gray-500/10 rounded-sm overflow-hidden">
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
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-dot"
                >
                  <circle cx="12.1" cy="12.1" r="1" />
                </svg>
              </span>
              <span>5 min read</span>
            </div>
          </div>
          <div>
            <ChannelPostCardCTA />
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ChannelPostCard;
