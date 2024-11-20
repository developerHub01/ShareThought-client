import { Separator } from "@/components/ui/separator";
import AvatarUpload from "@/app/signup/_components/AvatarUpload";
import Link from "next/link";
import SocialLogin from "@/app/signup/_components/SocialLogin";

const SignUpLeft = () => {
  return (
    <div className="bg-primary w-full flex justify-center items-center p-6 py-8">
      <div className="flex flex-col gap-6 items-center">
        <Link
          href="/"
          className="text-white text-3xl font-bold pb-3 select-none"
        >
          ShareThought
        </Link>
        <AvatarUpload />
        <Separator className="opacity-20 shadow-xl" />
        <div className="flex flex-col gap-4">
          <p className="text-gray-300 text-center select-none">Login with</p>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default SignUpLeft;
