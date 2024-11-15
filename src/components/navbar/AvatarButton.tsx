import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarPopover from "@/components/navbar/AvatarPopover";

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
