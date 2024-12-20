"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CircleStencil, Cropper, CropperRef } from "react-advanced-cropper";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/buttons/Button";
import Link from "next/link";
import "react-advanced-cropper/dist/style.css";
import "react-advanced-cropper/dist/themes/compact.css";
import { useRouter } from "next/navigation";
import { CenterScrollArea } from "@/components/scrollArea/CenterScrollArea";
import { useToast } from "@/hooks/use-toast";
import { setAvatar } from "@/redux/features/signup/signupSlice";

const AvatarEditModal = () => {
  const { avatar: avatarPreview } = useAppSelector((state) => state.signUp);
  const cropperRef = useRef<CropperRef>(null);
  const { toast } = useToast();

  const router = useRouter();

  const handleClose = () => router.push("/signup");

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
      dispatch(setAvatar(avatarURL));
      router.push("/signup");
    }, "image/png");
  }, [dispatch, router, toast]);

  return (
    <section className="h-full flex flex-col justify-center items-center gap-3 overflow-hidden py-5">
      <h2 className="text-primary text-xl font-bold select-none">
        Edit Avatar
      </h2>
      <LoginSeparator />
      {avatarPreview && (
        <CenterScrollArea className="w-full h-full px-6">
          <div className="grid place-items-center overflow-hidden max-w-lg mx-auto">
            <Cropper
              ref={cropperRef}
              src={avatarPreview}
              // onChange={onChange}
              stencilComponent={CircleStencil}
              stencilProps={{ grid: true }}
              className={"cropper w-full h-full object-contain"}
            />
          </div>
        </CenterScrollArea>
      )}

      <LoginSeparator />
      <div className="flex justify-center items-center gap-2 flex-wrap">
        <Link href={"/signup?avatar=camera"}>
          <Button>Change Avatar</Button>
        </Link>
        <Button onClick={handleSaveCroppedImage}>Save</Button>
      </div>
    </section>
  );
};

const LoginSeparator = () => (
  <Separator className="opacity-20 shadow-xl bg-primary w-40" />
);

export default AvatarEditModal;
