import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import SocialLoginSection from "@/components/auth/SocialLoginSection";

const LoginLeft = () => {
  return (
    <div className="bg-primary w-full flex justify-center items-center p-6 py-8">
      <div className="flex flex-col gap-6 items-center">
        <Link
          href="/"
          className="text-white text-3xl font-bold pb-3 select-none"
        >
          ShareThought
        </Link>
        <p className="text-accent text-center w-full max-w-96 leading-relaxed text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eos
          adnatus mollitia error blanditiis?
        </p>
        <Separator className="opacity-20 shadow-xl" />
        <SocialLoginSection />
      </div>
    </div>
  );
};

export default LoginLeft;
