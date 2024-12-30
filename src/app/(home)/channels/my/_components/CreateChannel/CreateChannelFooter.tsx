"use client";

import { Button } from "@/components/ui/button";
import { DrawerFooter } from "@/components/ui/drawer";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

interface CreateChannelFooterProps {
  createStep?: string;
}

const CreateChannelFooter = ({
  createStep = "0",
}: CreateChannelFooterProps) => {
  const router = useRouter();
  const { modifyParams, buildFullPath } = useModifyQueryParams();

  const currentStep = Number(createStep);

  const handleNevigateCancel = () =>
    router.push(buildFullPath(modifyParams("delete", "create")));

  const handleNevigateNext = () => {
    if (currentStep < 5)
      return router.push(
        buildFullPath(modifyParams("set", "create", String(currentStep + 1)))
      );
    else return handleNevigateCancel();
  };

  const handleSkip = () => handleNevigateNext();
  const handleNext = () => handleNevigateNext();
  const handlePrevious = () => {
    if (currentStep === 1) return;

    return router.push(
      buildFullPath(modifyParams("set", "create", String(currentStep - 1)))
    );
  };

  const handleCancel = () => handleNevigateCancel();

  return (
    <DrawerFooter>
      <div className="flex justify-end items-center gap-2 flex-wrap">
        <FooterButton onClick={handleCancel} variant={"ghost"}>
          Cancel
        </FooterButton>
        {currentStep !== 1 && (
          <FooterButton onClick={handlePrevious} variant={"outline"}>
            Back
          </FooterButton>
        )}
        {currentStep < 5 && currentStep !== 1 && (
          <FooterButton onClick={handleSkip} variant={"outline"}>
            Skip
          </FooterButton>
        )}
        <FooterButton onClick={handleNext}>
          {currentStep < 5 ? "Next" : "Create"}
        </FooterButton>
      </div>
    </DrawerFooter>
  );
};

interface FooterButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  [key: string]: unknown;
}
const FooterButton = ({ children, className, ...props }: FooterButtonProps) => {
  return (
    <Button
      className={clsx(
        "uppercase min-w-max sm:min-w-24 text-xs sm:text-sm",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CreateChannelFooter;
