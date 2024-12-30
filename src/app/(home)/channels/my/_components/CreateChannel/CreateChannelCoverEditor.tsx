"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Cropper, CropperRef } from "react-advanced-cropper";
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
import { aspectRatioList } from "@/constant";

const CreateChannelCoverEditor = () => {
  const { channelCover: coverPreview } = useAppSelector(
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
    router.push(buildFullPath(modifyParams("set", "create", "4")));

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!coverPreview) handleClose();
  }, [router, coverPreview]);

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

      const coverURL = URL.createObjectURL(blob);
      dispatch(
        setField({
          key: "channelCover",
          value: coverURL,
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
    <section className="h-full flex flex-col justify-center items-center gap-3 overflow-hidden py-5">
      {coverPreview && (
        <CenterScrollArea className="w-full h-full px-6">
          <div className="grid place-items-center overflow-hidden max-w-lg mx-auto">
            <Cropper
              ref={cropperRef}
              src={coverPreview}
              stencilProps={{
                aspectRatio:
                  aspectRatioList.banner[0] / aspectRatioList.banner[1],
                grid: true,
              }}
              className={"cropper w-full h-full object-contain"}
            />
          </div>
        </CenterScrollArea>
      )}
    </section>
  );
};

export default CreateChannelCoverEditor;
