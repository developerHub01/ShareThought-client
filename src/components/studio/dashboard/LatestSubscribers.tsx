import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const imgUrl =
  "https://images.unsplash.com/photo-1730217804424-825f12eef36f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const subscribers = [
  {
    id: "1",
    name: "FullName1",
    userName: "username1",
    avatar: imgUrl,
  },
  {
    id: "2",
    name: "FullName2",
    userName: "username2",
    avatar: imgUrl,
  },
  {
    id: "3",
    name: "FullName3",
    userName: "username3",
    avatar: imgUrl,
  },
  {
    id: "4",
    name: "FullName4",
    userName: "username4",
    avatar: imgUrl,
  },
];

const LatestSubscribers = () => {
  return (
    <div className="border rounded-sm p-5 flex flex-col gap-5 shadow-lg">
      <div>
        <h4 className="text-lg font-semibold">Recent subscribers</h4>
        <p className="text-xs text-gray-500">Last 90 days</p>
      </div>
      <ul className="flex flex-col gap-3">
        {subscribers.map(({ id, name, userName, avatar }) => (
          <li key={id} className="w-full flex items-center gap-3 p-1">
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
            <Link href="/" className="flex flex-col">
              <p className="text-sm font-medium line-clamp-1 overflow-hidden text-ellipsis">
                {name}
              </p>
              <p className="text-xs text-gray-500 line-clamp-1 overflow-hidden text-ellipsis">
                {userName}
              </p>
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
          See all
        </Button>
      </div>
    </div>
  );
};

export default LatestSubscribers;
