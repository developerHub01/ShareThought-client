import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import clsx from "clsx";
import { LeftIcon, RightIcon } from "@/lib/icons";
import Link from "next/link";

const TagList = () => {
  const tagList = Array.from({ length: 8 });
  const activeTagId = 0;
  return (
    <section className="w-full overflow-hidden flex justify-between items-center gap-1 pt-2 pb-4">
      <Button
        size={"icon"}
        variant={"secondary"}
        className="rounded-full flex-shrink-0"
      >
        <LeftIcon />
      </Button>
      <ScrollArea className="w-full flex gap-1 whitespace-nowrap flex-1 overflow-hidden">
        <div className="w-full overflow-hidden flex gap-2">
          {tagList.map((tab, index) => (
            <Link href={"/"} key={index}>
              <Button
                size="sm"
                variant={"ghost"}
                className={clsx("bg-primary/5 hover:bg-primary/20", {
                  // "bg-primary/5": index !== activeTagId,
                  "bg-primary text-white hover:bg-primary hover:text-white":
                    index === activeTagId,
                })}
              >
                Tag name {index + 1}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>

      <Button
        size={"icon"}
        variant={"secondary"}
        className="rounded-full flex-shrink-0"
      >
        <RightIcon />
      </Button>
    </section>
  );
};

export default TagList;
