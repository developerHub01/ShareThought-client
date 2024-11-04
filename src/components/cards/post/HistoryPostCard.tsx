import Image from "next/image";
import Link from "next/link";
import PostCardCTA from "@/components/actions/PostCardCTA";

const DotIcon = () => (
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
);

const HistoryPostCard = () => {
  const imgUrl =
    "https://images.unsplash.com/photo-1725092097123-ae9e8c001490?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <>
      <div className="shadow-xl w-full border border-gray-500/10 rounded-sm overflow-hidden z-10 flex">
        <Link href={"/"} className="aspect-video overflow-hidden min-w-44">
          <Image
            src={imgUrl}
            width={300}
            height={300}
            alt=""
            className="size-full object-cover select-none"
          />
        </Link>
        <div className="p-2.5 py-3 flex justify-between gap-2 w-full">
          <div className="flex flex-col gap-2">
            <Link href={"/"}>
              <h3 className="font-semibold line-clamp-2 overflow-hidden text-ellipsis">
                🔴 Let&apos;s build a Full Stack E-Commerce App with NEXT.JS 15
              </h3>
            </Link>
            <Link
              href={"/"}
              className="flex justify-start items-center gap-2 py-0.5 pl-0"
            >
              <div className="size-6 overflow-hidden aspect-square rounded-full flex-shrink-0">
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
            <div className="flex justify-start items-center gap-1 text-gray-500 text-sm flex-wrap select-none">
              <span>10 mins read</span>
              <DotIcon />
              <span>5 days ago</span>
            </div>
          </div>
          <div className="self-center flex-shrink-0">
            <PostCardCTA postType={"HISTORY_POST_CARD"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryPostCard;