import { Separator } from "@/components/ui/separator";
import AvatarUpload from "@/app/signup/_components/AvatarUpload";
import Link from "next/link";
import SocialLoginSection from "@/components/auth/SocialLoginSection";

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
        <SocialLoginSection />
      </div>
    </div>
  );
};

export default SignUpLeft;
