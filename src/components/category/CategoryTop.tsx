import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Bookmark as SaveCategoryIcon,
  Share2 as ShareIcon,
} from "lucide-react";
import PostCardCTA from "@/components/actions/PostCardCTA";
import CategoryTopDescriptionButton from "@/components/category/CategoryTopDescriptionButton";
import CategoryDescriptionPopover from "@/components/category/CategoryDescriptionPopover";

const CategoryTop = () => {
  const imgUrl =
    "https://images.unsplash.com/photo-1730660666237-1e6a008067a9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis omnis recusandae obcaecati possimus, itaque eaque aspernatur labore magnam hic odio eos voluptatem! Reprehenderit nemo numquam sapiente atque omnis maiores ratione minima doloribus vel? Unde nam qui eveniet quod, atque saepe quia animi corporis numquam repellendus eum mollitia soluta aperiam doloribus sint nesciunt fugit eligendi libero ab? Quibusdam veniam hic perferendis unde nobis provident harum nulla quod accusamus vel consectetur distinctio perspiciatis accusantium sed porro exercitationem, dolore culpa itaque enim, fuga minima, aperiam cum asperiores ad. Nisi, officia perspiciatis reiciendis neque rem ea magni sed. Quos, quidem nemo adipisci maxime voluptatibus dolorem quasi quia voluptatem aut, laborum iste voluptate distinctio inventore magnam facilis dolorum impedit iusto sit animi totam quod cum voluptas amet? Corrupti dicta autem quas ducimus beatae asperiores voluptate, tenetur eius ullam fugiat recusandae quis rerum a nam! Quia itaque dolor tempora explicabo illum totam excepturi, ducimus architecto exercitationem similique quaerat dignissimos assumenda laborum quibusdam consequatur quis, vitae molestias accusamus non nobis deserunt iusto suscipit sed? Dolor, ab? Accusantium cupiditate enim nostrum nulla officia, molestiae optio esse sequi quidem rerum magni et provident veniam quae, id ipsam vitae rem nobis cum! Voluptatibus alias qui neque eligendi dolores dicta blanditiis?";

  return (
    <section
      className="w-full min-h-72 bg-cover bg-no-repeat grid place-items-center rounded-sm overflow-hidden relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gray-800/50 before:backdrop-blur-2xl"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <CategoryDescriptionPopover description={description} />
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8 w-full max-w-4xl mx-auto relative z-10 px-5 py-8 text-white">
        <div className="w-full aspect-video overflow-hidden rounded-sm min-w-full sm:min-w-80 shadow-sm">
          <Image
            src={imgUrl}
            width={500}
            height={450}
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="w-full flex flex-col gap-3 overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-bold line-clamp-2">
            Read Later
          </h2>
          <Link href={"/"} className="flex justify-start items-center gap-2">
            <div className="size-8 overflow-hidden aspect-square rounded-full flex-shrink-0">
              <Image
                src={imgUrl}
                width={50}
                height={50}
                alt=""
                className="size-full object-cover select-none"
              />
            </div>
            <h4 className="text-sm font-semibold line-clamp-1 overflow-hidden text-ellipsis">
              Developer Hub BD
            </h4>
          </Link>
          <div className="text-sm leading-relaxed">
            <p className="pb-1">16 posts</p>
            <p>
              {description.slice(0, 100)}
              <CategoryTopDescriptionButton />
            </p>
          </div>
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

export default CategoryTop;
