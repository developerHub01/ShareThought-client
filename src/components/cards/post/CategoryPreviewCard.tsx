import { Menu as StackIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CategoryPreviewCard = () => {
  const imgUrl =
    "https://images.unsplash.com/photo-1730217804424-825f12eef36f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="pt-3">
      <div className="shadow-xl w-full max-w-sm border border-gray-500/10 rounded-sm relative z-10">
        <CardFallBack imgUrl={imgUrl} />
        <Link href={"/"}>
          <div className="aspect-video relative rounded-t-sm overflow-hidden">
            <Image
              src={imgUrl}
              width={300}
              height={300}
              alt=""
              className="size-full object-cover select-none"
            />
            <span className="absolute right-1 bottom-1.5 bg-white/50 backdrop-blur-lg backdrop-opacity-50 drop-shadow-md border border-gray-500/10 rounded-sm px-1.5 text-white capitalize text-xs tracking-wide overflow-hidden flex justify-center items-center gap-1">
              <StackIcon size={14} />
              25 posts
            </span>
          </div>
          <div className="p-2.5 py-3 flex justify-between gap-2">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold line-clamp-2 overflow-hidden text-ellipsis">
                🔴 Let&apos;s build a Full Stack E-Commerce App with NEXT.JS 15
              </h3>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

const CardFallBack = ({ imgUrl }: { imgUrl: string }) => {
  return (
    <div
      className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-3 w-[90%] flex flex-col bg-red-600 -z-10 rounded-sm aspect-video overflow-hidden rounded-t-sm shadow-xl`}
    >
      <Image
        src={imgUrl}
        width={300}
        height={300}
        alt=""
        className="size-full object-cover select-none"
      />
    </div>
  );
};

export default CategoryPreviewCard;
