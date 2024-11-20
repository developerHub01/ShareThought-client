import { Separator } from "@/components/ui/separator";
import AvatarUpload from "@/app/signup/_components/AvatarUpload";
import SocialAuthButton from "@/components/buttons/SocialAuthButton";

const SignUpLeft = () => {
  return (
    <div className="bg-primary w-full flex justify-center items-center p-6 py-8">
      <div className="flex flex-col gap-6 items-center">
        <AvatarUpload />
        <Separator className="opacity-20 shadow-xl" />
        <div className="flex flex-wrap justify-center items-center gap-2.5">
          <SocialAuthButton authType="google" />
          <SocialAuthButton authType="github" />
          <SocialAuthButton authType="facebook" />
        </div>
      </div>
    </div>
  );
};

export default SignUpLeft;
