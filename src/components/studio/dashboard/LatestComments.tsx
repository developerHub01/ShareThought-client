import DotIcon from "@/components/icons/DotIcon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const imgUrl =
  "https://images.unsplash.com/photo-1730217804424-825f12eef36f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const thumbUrl =
  "https://images.unsplash.com/photo-1678138091332-432d4a1ac407?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const subscribers = [
  {
    id: "1",
    name: "FullName1",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. In autem, perferendis obcaecati aliquid, repellat facilis rem, non officiis quisquam similique accusantium alias? Qui, pariatur dicta saepe culpa eaque laboriosam tempora.",
    date: "2 day ago",
    avatar: imgUrl,
    postThumb: thumbUrl,
  },
  {
    id: "2",
    name: "FullName2",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. In autem, perferendis obcaecati aliquid, repellat facilis rem, non officiis quisquam similique accusantium alias? Qui, pariatur dicta saepe culpa eaque laboriosam tempora.",
    date: "2 day ago",
    avatar: imgUrl,
    postThumb: thumbUrl,
  },
  {
    id: "3",
    name: "FullName3",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. In autem, perferendis obcaecati aliquid, repellat facilis rem, non officiis quisquam similique accusantium alias? Qui, pariatur dicta saepe culpa eaque laboriosam tempora.",
    date: "2 day ago",
    avatar: imgUrl,
    postThumb: thumbUrl,
  },
  {
    id: "4",
    name: "FullName4",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. In autem, perferendis obcaecati aliquid, repellat facilis rem, non officiis quisquam similique accusantium alias? Qui, pariatur dicta saepe culpa eaque laboriosam tempora.",
    date: "2 day ago",
    avatar: imgUrl,
    postThumb: thumbUrl,
  },
];

const LatestComments = () => {
  return (
    <div className="border rounded-sm p-5 flex flex-col gap-5 shadow-lg">
      <div>
        <h4 className="text-lg font-semibold">Latest comments</h4>
        <p className="text-xs text-gray-500">
          Channel comments I haven&apos;t responded to
        </p>
      </div>
      <ul className="flex flex-col gap-3">
        {subscribers.map(({ id, name, comment, avatar, postThumb, date }) => (
          <li key={id} className="w-full flex items-start gap-3 p-1">
            <Link
              href="/"
              className="size-9 rounded-full overflow-hidden flex-shrink-0"
            >
              <Image
                src={avatar}
                width={40}
                height={40}
                alt=""
                className="size-full object-cover select-none"
              />
            </Link>
            <div className="flex flex-col flex-1 gap-1">
              <div className="flex items-center gap-1 justify-between">
                <Link
                  href="/"
                  className="text-sm font-medium line-clamp-1 overflow-hidden text-ellipsis"
                >
                  {name}
                </Link>
                <span className="text-gray-500">
                  <DotIcon size={10} />
                </span>
                <p className="text-xs text-gray-500 line-clamp-2 overflow-hidden text-ellipsis flex-shrink-0">
                  {date}
                </p>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2 overflow-hidden text-ellipsis leading-relaxed">
                {comment}
              </p>
            </div>
            <Link
              href="/"
              className="aspect-video rounded-sm overflow-hidden w-20"
            >
              <Image
                src={postThumb}
                width={250}
                height={250}
                alt=""
                className="size-full object-cover select-none"
              />
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <Button
          className="rounded-sm self-start px-5"
          size="sm"
          variant="outline"
        >
          view more
        </Button>
      </div>
    </div>
  );
};

export default LatestComments;
