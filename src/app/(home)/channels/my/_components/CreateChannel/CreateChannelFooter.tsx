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
import {
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
  SkipForward as SkipIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";

interface CreateChannelFooterProps {
  createStep?: string;
}

const CreateChannelFooter = ({
  createStep = "0",
}: CreateChannelFooterProps) => {
  const router = useRouter();
  const { channelName, channelAvatar, channelCover, channelDescription } =
    useAppSelector((state) => state.createChannel.channelState);
  const dispatch = useAppDispatch();
  const { modifyParams, buildFullPath } = useModifyQueryParams();
  const currentStep = Number(createStep);

  useEffect(() => {
    /* if channel name is not defined and step is in another then move to channel name step */
    if (!channelName && currentStep) {
      router.push(buildFullPath(modifyParams("set", "create", "1")));
    } else if (currentStep === 6 && !channelAvatar) {
      /* if channel avatar is not defined and step is in avatar editor then move to upload channel avatar step */
      router.push(buildFullPath(modifyParams("set", "create", "3")));
    } else if (currentStep === 7 && !channelCover) {
      /* if channel cover is not defined and step is in cover editor then move to upload channel cover step */
      router.push(buildFullPath(modifyParams("set", "create", "4")));
    }
  }, []);

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
    dispatch(clearState());
    handleNevigateCancel();
  };

  const handleCreate = () => {
    /* TODO */
    /* Do channel creation job */
    handleCancel();
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

  const isNextDisabled = useMemo(() => {
    return [
      {
        value: channelName,
        step: 1,
      },
      {
        value: channelDescription,
        step: 2,
      },
      {
        value: channelAvatar,
        step: 3,
      },
      {
        value: channelCover,
        step: 4,
      },
    ].some(({ value, step }) => step === currentStep && !value);
  }, [
    channelName,
    channelAvatar,
    channelCover,
    channelDescription,
    currentStep,
  ]);

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
              <FooterButton
                onClick={handleSkip}
                variant={"outline"}
                disabled={!isNextDisabled}
              >
                Skip <SkipIcon size={18} />
              </FooterButton>
            )}
            {currentStep !== 1 && (
              <FooterButton onClick={handlePrevious} variant={"outline"}>
                <LeftIcon size={18} />
                Back
              </FooterButton>
            )}
            <FooterButton
              onClick={currentStep < 5 ? handleNext : handleCreate}
              disabled={isNextDisabled}
            >
              {currentStep < 5 ? (
                <>
                  Next
                  <RightIcon size={18} />
                </>
              ) : (
                "Create"
              )}
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
