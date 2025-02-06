import { CenterScrollArea } from "@/components/scrollArea/CenterScrollArea";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import { useToast } from "@/hooks/use-toast";
import {
  changeImage,
  toggleisImageEditorOpen,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef } from "react";
import { Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import "react-advanced-cropper/dist/themes/compact.css";

interface ImageEditorProps {}

const ImageEditor = ({}: ImageEditorProps) => {
  const searchParams = useSearchParams();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const { activeBlock } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId]
  );

  const { isImageEditorOpen } = useAppSelector((state) => state.blogBuilder);
  const dispatch = useAppDispatch();

  if (!activeBlock) return null;

  const cropperRef = useRef<CropperRef>(null);
  const { toast } = useToast();
  const router = useRouter();
  const { modifyParams, buildFullPath } = useModifyQueryParams();

  const targetImage = searchParams.get("edit");

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
      if (!blob) return console.error("Failed to generate Blob from canvas");

      const coverURL = URL.createObjectURL(blob);

      dispatch(changeImage({ blogId, id: activeBlock, image: coverURL }));
      dispatch(toggleisImageEditorOpen());
      handleClose();
    }, "image/png");
  }, [dispatch, router, toast]);

  const handleClose = () =>
    router.push(buildFullPath(modifyParams("delete", "edit")));

  useEffect(() => {
    if (!targetImage) handleClose();

    if (isImageEditorOpen) handleSaveCroppedImage();
  }, [router, targetImage, isImageEditorOpen]);

  return (
    <CenterScrollArea className="w-full h-full">
      <section className="w-full h-full flex flex-col justify-center items-center gap-3 overflow-hidden py-5">
        {targetImage && (
          <CenterScrollArea className="w-full h-full px-6">
            <div className="w-full grid place-items-center overflow-hidden mx-auto">
              <Cropper
                ref={cropperRef}
                src={targetImage}
                stencilProps={{
                  grid: true,
                }}
                className={"cropper w-full h-full object-contain"}
              />
            </div>
          </CenterScrollArea>
        )}
      </section>
    </CenterScrollArea>
  );
};

export default ImageEditor;
