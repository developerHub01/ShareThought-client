import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import AvatarPopover from "@/components/navbar/AvatarPopoverV1";
import AvatarPopover from "@/components/navbar/right/avatar/AvatarPopoverV2";

const AvatarButton = () => {
  return (
    <AvatarPopover>
      <Avatar className="size-8 sm:size-10 cursor-pointer">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </AvatarPopover>
  );
};

export default AvatarButton;
