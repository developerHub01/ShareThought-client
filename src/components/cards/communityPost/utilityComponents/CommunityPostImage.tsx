import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

const imgUrl =
  "https://images.unsplash.com/photo-1730660666237-1e6a008067a9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const CommunityPostImage = () => {
  return (
    <div className="w-full max-w-[600px] mx-auto">
      <AspectRatio ratio={1} className="bg-muted">
        <Image
          src={imgUrl}
          alt="Photo by Drew Beamer"
          fill
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  );
};

export default CommunityPostImage;
