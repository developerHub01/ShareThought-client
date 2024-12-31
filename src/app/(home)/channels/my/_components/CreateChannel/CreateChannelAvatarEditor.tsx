"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CircleStencil, Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import "react-advanced-cropper/dist/themes/compact.css";
import { useRouter } from "next/navigation";
import { CenterScrollArea } from "@/components/scrollArea/CenterScrollArea";
import { useToast } from "@/hooks/use-toast";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import {
  clearSaveImageRequest,
  setField,
} from "@/redux/features/create-channel/createChannelSlice";

const CreateChannelAvatarEditor = () => {
  const { channelAvatar: avatarPreview } = useAppSelector(
    (state) => state.createChannel.channelState
  );
  const imageSaveRequest = useAppSelector(
    (state) => state.createChannel.imageSaveRequest
  );
  const cropperRef = useRef<CropperRef>(null);
  const { toast } = useToast();
  const router = useRouter();
  const { modifyParams, buildFullPath } = useModifyQueryParams();

  const handleClose = () =>
    router.push(buildFullPath(modifyParams("set", "create", "3")));

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!avatarPreview) handleClose();
  }, [router, avatarPreview]);

  const handleSaveCroppedImage = useCallback(() => {
    const cropper = cropperRef.current;
    if (!cropper) return;

    const canvas = cropper.getCanvas();
    if (!canvas) {
      return toast({
        title: "Oops! Something went wrong!",
        description:
          "We couldn't generate the cropped image. Please try again.",
      });
    }

    canvas.toBlob((blob) => {
      if (!blob) {
        console.error("Failed to generate Blob from canvas");
        return;
      }

      const avatarURL = URL.createObjectURL(blob);
      dispatch(
        setField({
          key: "channelAvatar",
          value: avatarURL,
        })
      );
    }, "image/png");
  }, [dispatch, router, toast]);

  useEffect(() => {
    if (imageSaveRequest) {
      handleSaveCroppedImage();
      dispatch(clearSaveImageRequest());
    }
  }, [imageSaveRequest, dispatch]);

  return (
    <CenterScrollArea className="w-full h-full">
      <section className="w-full h-full flex flex-col justify-center items-center gap-3 overflow-hidden py-5">
        {avatarPreview && (
          <CenterScrollArea className="w-full h-full px-6">
            <div className="grid place-items-center overflow-hidden max-w-lg mx-auto">
              <Cropper
                ref={cropperRef}
                src={avatarPreview}
                stencilComponent={CircleStencil}
                stencilProps={{ grid: true }}
                className={"cropper w-full h-full object-contain"}
              />
            </div>
          </CenterScrollArea>
        )}
      </section>
    </CenterScrollArea>
  );
};

export default CreateChannelAvatarEditor;
