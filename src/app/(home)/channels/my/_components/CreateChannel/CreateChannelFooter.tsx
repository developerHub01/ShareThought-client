"use client";

import { Button } from "@/components/ui/button";
import { DrawerFooter } from "@/components/ui/drawer";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import {
  clearState,
  imageRequestSave,
} from "@/redux/features/create-channel/createChannelSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

interface CreateChannelFooterProps {
  createStep?: string;
}

const CreateChannelFooter = ({
  createStep = "0",
}: CreateChannelFooterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const channelState = useAppSelector(
    (state) => state.createChannel.channelState
  );
  const dispatch = useAppDispatch();
  const { modifyParams, buildFullPath } = useModifyQueryParams();

  useEffect(() => {
    if (!channelState.channelName && searchParams.get("create")?.trim() !== "1")
      return router.push(buildFullPath(modifyParams("set", "create", "1")));
  }, []);

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

  const handleCancel = () => {
    handleNevigateCancel();
    dispatch(clearState());
  };

  const handleLeaveEditor = () => {
    return router.push(
      buildFullPath(
        modifyParams("set", "create", currentStep === 6 ? "3" : "4")
      )
    );
  };

  const handleCancelEdit = () => {
    handleLeaveEditor();
  };
  const handleSaveEdited = () => {
    dispatch(imageRequestSave());
    handleLeaveEditor();
  };

  return (
    <DrawerFooter>
      <div className="flex justify-end items-center gap-2 flex-wrap">
        {[6, 7].includes(currentStep) ? (
          /* if popover is editor */
          <>
            <FooterButton onClick={handleCancelEdit} variant={"ghost"}>
              Cancel
            </FooterButton>
            <FooterButton onClick={handleSaveEdited}>Save</FooterButton>
          </>
        ) : (
          <>
            <FooterButton onClick={handleCancel} variant={"ghost"}>
              Cancel
            </FooterButton>
            {currentStep < 5 && currentStep !== 1 && (
              <FooterButton onClick={handleSkip} variant={"outline"}>
                Skip
              </FooterButton>
            )}
            {currentStep !== 1 && (
              <FooterButton onClick={handlePrevious} variant={"outline"}>
                Back
              </FooterButton>
            )}
            <FooterButton
              onClick={handleNext}
              disabled={!channelState.channelName}
            >
              {currentStep < 5 ? "Next" : "Create"}
            </FooterButton>
          </>
        )}
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
