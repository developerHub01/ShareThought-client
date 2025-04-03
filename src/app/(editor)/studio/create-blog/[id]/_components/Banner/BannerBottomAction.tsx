"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import { CameraIcon, EditIcon } from "@/lib/icons";
import { useRouter } from "next/navigation";
import { memo, useMemo } from "react";

interface BannerBottomActionProps {
  handleCamera: () => void;
}

const BannerBottomAction = memo(({ handleCamera }: BannerBottomActionProps) => {
  const router = useRouter();
  const { modifyParams, buildFullPath } = useModifyQueryParams();

  const handleEdit = () =>
    router.push(buildFullPath(modifyParams("set", "edit", "banner")));

  const actionList = useMemo(
    () => [
      {
        id: "camera",
        label: "Camera",
        Icon: CameraIcon,
        onClick: handleCamera,
      },
      {
        id: "edit",
        label: "Edit",
        Icon: EditIcon,
        onClick: handleEdit,
      },
    ],
    [handleCamera, handleEdit]
  );
  return (
    <div className="absolute bottom-1 right-1 bg-primary-foreground/20 backdrop-blur-sm px-2 py-1 flex items-center gap-2 rounded-md">
      <TooltipProvider>
        {actionList.map(({ id, label, Icon, onClick }) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size={"smIcon"}
                className="rounded-full"
                onClick={onClick}
              >
                <Icon size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={10}>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
});

export default BannerBottomAction;
