import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import React from 'react'

const Follower = () => {
  return (
    <Link
      href="/"
      className="w-full flex gap-2 sm:gap-3 items-center p-2.5 px-3 sm:px-4 bg-transparent hover:bg-accent"
    >
      <Avatar className="size-9">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-0.5">
        <p className="sm:text-sm font-normal line-clamp-1 text-gray-700">
          Abdus Shohid Shakil
        </p>
        <span className="text-xs text-gray-400">Followed 2 days ago</span>
      </div>
    </Link>
  );
}

export default Follower