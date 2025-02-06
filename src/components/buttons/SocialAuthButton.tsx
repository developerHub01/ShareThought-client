import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SocialAuthButtonProps {
  authType: "google" | "github" | "facebook";
}

const SocialAuthButton = ({ authType, ...props }: SocialAuthButtonProps) => {
  let iconLink = "";
  let iconLabel = "";

  switch (authType) {
    case "google":
      iconLink = "/social/google.svg";
      iconLabel = "google signup";
      break;
    case "github":
      iconLink = "/social/github.svg";
      iconLabel = "github signup";
      break;
    case "facebook":
      iconLink = "/social/facebook.svg";
      iconLabel = "facebook signup";
  }

  const SocialIcon = () => (
    <Image src={iconLink} width={80} height={80} alt={iconLabel} />
  );

  return (
    <Button
      size={"icon"}
      type="submit"
      name="action"
      value={authType}
      className="bg-white rounded-full p-1 hover:bg-white shadow-xl hover:scale-110 duration-150 transition-transform border"
      {...props}
    >
      <SocialIcon />
    </Button>
  );
};

export default SocialAuthButton;
