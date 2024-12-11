import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const CreatePost = () => {
  return (
    <div className="border rounded-sm p-5 gap-6 flex flex-col select-none text-center shadow-lg">
      <PostCreateSection />
      <Separator />
      <CommunityPostCreateSection />
    </div>
  );
};

const PostCreateSection = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h4 className="text-lg pb-1 font-semibold">Create a post</h4>
      <p className="text-sm text-gray-500 pb-3 leading-relaxed">
        Share your thoughts, experiences, or ideas with the world.
      </p>
      <Link href={"/"}>
        <Button size={"sm"} variant="outline">
          Create post
        </Button>
      </Link>
    </div>
  );
};

const CommunityPostCreateSection = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h4 className="text-lg pb-1 font-semibold">Create community post</h4>
      <p className="text-sm text-gray-500 pb-3 leading-relaxed">
        Share your thoughts, experiences, or ideas with the world.
      </p>
      <Link href={"/"}>
        <Button size={"sm"} variant="outline">
          Create community post
        </Button>
      </Link>
    </div>
  );
};

export default CreatePost;
