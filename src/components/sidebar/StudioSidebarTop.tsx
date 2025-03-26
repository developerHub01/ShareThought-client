"use client";

import SidebarTrigger from "@/components/sidebar/SidebarTrigger";
import Link from "next/link";
import { useSidebar } from "@/components/sidebar/SidebarMain";
import { useIsMobile } from "@/hooks/use-mobile";
import clsx from "clsx";
import { motion, AnimatePresence } from "motion/react";
import { sidebarLabelAnimProps } from "@/components/sidebar/sidebarLabelAnim";
import Image from "next/image";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { ExternalLink as RedirectIcon } from "@/lib/icons";
import { Button } from "@/components/buttons/Button";
import useIsStudioPost from "@/hooks/use-is-studio-post";

interface ChannelSidebarTopProps {
  sidebarState: "expanded" | "collapsed";
}

interface ContextPreviewProps {
  sidebarState: "expanded" | "collapsed";
  isStudioPost: boolean;
}

const channelLogo =
  "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const StudioSidebarTop = () => {
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-3">
      <div
        className={clsx("w-full group flex gap-0 items-center", {
          "justify-center": state === "collapsed",
          "justify-start": state === "expanded",
        })}
      >
        <SidebarTrigger className="rounded-full flex-shrink-0" />
        <AnimatePresence>
          {(isMobile || state === "expanded") && <AppName />}
        </AnimatePresence>
      </div>
      <ChannelSidebarTop sidebarState={state} />
    </div>
  );
};

const AppName = () => {
  return (
    <motion.span key="app_name">
      <Link
        href={"/studio"}
        className="truncate font-semibold flex-1 text-left text-sm leading-tight px-2 select-none"
        {...sidebarLabelAnimProps}
      >
        ShareThought Studio
      </Link>
    </motion.span>
  );
};

const ChannelSidebarTop = ({ sidebarState }: ChannelSidebarTopProps) => {
  const isStudioPost = useIsStudioPost();

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <ContextPreview sidebarState={sidebarState} isStudioPost={isStudioPost} />
      <AnimatePresence>
        {sidebarState === "expanded" && (
          <>
            {isStudioPost ? (
              <div className="space-y-1 w-full px-2">
                <h3 className="text-primary font-semibold">Your Post</h3>
                <p className="text-xs line-clamp-1 overflow-hidden">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Ducimus eaque ipsa blanditiis ad. Quam distinctio ut velit
                  ipsa quas ducimus, similique, iure delectus, incidunt fugit
                  corrupti illum in molestias eum!
                </p>
              </div>
            ) : (
              <div className="space-y-1 text-center px-2">
                <h3 className="text-primary font-semibold">Your channel</h3>
                <p className="text-xs">Developer Hub</p>
              </div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContextPreview = ({
  sidebarState,
  isStudioPost,
}: ContextPreviewProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {isStudioPost ? (
            <Link
              href={"/"}
              className="w-full h-full min-h-8 min-w-8 aspect-video rounded-md overflow-hidden bg-slate-700 relative grid place-items-center group"
            >
              <Image
                src={channelLogo}
                alt="channel logo"
                width={300}
                height={300}
                className="size-full object-cover"
              />
              <div className="absolute size-full grid place-items-center bg-primary/50 opacity-0 hover:opacity-100 duration-100">
                <Button
                  className={clsx(
                    "rounded-full aspect-square bg-accent/0 hover:bg-accent/30",
                    {
                      "w-7": sidebarState === "collapsed",
                    }
                  )}
                  size="icon"
                >
                  <RedirectIcon
                    className="text-white"
                    size={sidebarState === "collapsed" ? 18 : 24}
                  />
                </Button>
              </div>
            </Link>
          ) : (
            <Link
              href={"/"}
              className="size-full min-h-8 min-w-8 max-h-32 max-w-32 aspect-square rounded-full overflow-hidden bg-slate-700 relative grid place-items-center"
            >
              <Image
                src={channelLogo}
                alt=""
                width={300}
                height={300}
                className="size-full object-cover"
              />
              <div className="absolute size-full grid place-items-center bg-primary/50 opacity-0 hover:opacity-100 duration-100">
                <Button
                  className="rounded-full aspect-square bg-accent/0 hover:bg-accent/30"
                  size="icon"
                >
                  <RedirectIcon
                    className="text-white"
                    size={sidebarState === "collapsed" ? 18 : 24}
                  />
                </Button>
              </div>
            </Link>
          )}
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          sideOffset={sidebarState === "expanded" ? -15 : 0}
        >
          {isStudioPost ? <p>View Channel</p> : <p>View Channel</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StudioSidebarTop;
