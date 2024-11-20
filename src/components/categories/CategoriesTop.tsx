import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Bookmark as SaveCategoryIcon,
  Share2 as ShareIcon,
} from "lucide-react";
import PostCardCTA from "@/components/actions/PostCardCTA";

const CategoriesTop = () => {
  const imgUrl =
    "https://images.unsplash.com/photo-1730660666237-1e6a008067a9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <section
      className="w-full min-h-72 bg-cover bg-no-repeat grid place-items-center rounded-sm overflow-hidden relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary/50 before:backdrop-blur-2xl"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8 w-full max-w-4xl mx-auto relative z-10 px-5 py-8 text-white">
        <div>
          <div className="w-full aspect-video overflow-hidden rounded-sm min-w-full sm:min-w-80 shadow-sm">
            <Image
              src={imgUrl}
              width={500}
              height={450}
              alt=""
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 overflow-hidden">
          <h2 className="text-3xl font-bold line-clamp-2">Read Later</h2>
          <Link
            href={"/"}
            className="flex justify-start items-center gap-2"
          >
            <div className="size-8 md:size-10 overflow-hidden aspect-square rounded-full flex-shrink-0">
              <Image
                src={imgUrl}
                width={80}
                height={80}
                alt=""
                className="size-full object-cover select-none"
              />
            </div>
            <h4 className="text-sm font-semibold line-clamp-1 overflow-hidden text-ellipsis">
              Developer Hub BD
            </h4>
          </Link>
          <p>16 posts</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
            sapiente. <Link href={"/"}>...see more</Link>
          </p>
          <div className="flex items-center gap-4">
            <Button size={"icon"} variant={"cta"} className="rounded-full">
              <SaveCategoryIcon />
            </Button>
            <Button size={"icon"} variant={"cta"} className="rounded-full">
              <ShareIcon />
            </Button>
            <PostCardCTA postType="CATEGORY_WRAPPER_CARD" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesTop;
