"use client";

import React, {
  ChangeEvent,
  FocusEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { DeleteIcon, ImageIcon } from "@/lib/icons";
import {
  changePollOption,
  deletePollOption,
} from "@/redux/features/create-community-post/createCommunityPostSlice";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import OptionLimit from "@/app/studio/create-community-post/_components/ContextBasedCanvas/Poll/OptionLimit";
import ImageUploader from "@/app/studio/create-community-post/_components/ImageUploader";

interface ImagePollOptionProp {
  id: string;
  text: string;
  image?: string;
}

const ImagePollOption = memo(({ id, text, image }: ImagePollOptionProp) => {
  const [optionText, setOptionText] = useState<string>(text);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (optionText === text) return;

    setOptionText(text);
  }, [text]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setOptionText(e.target.value),
    []
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) =>
      changePollOption({
        id,
        text: e.target.value,
      }),
    []
  );

  const handleDelete = useCallback(
    () =>
      dispatch(
        deletePollOption({
          id,
        })
      ),
    []
  );

  const handleInputWraperClick = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, [inputRef]);

  const handleChangeImage = useCallback(
    (images: Array<string>) =>
      changePollOption({
        id,
        image: images[0],
      }),
    []
  );

  return (
    <div className="w-full flex gap-1 h-20 items-center border rounded-sm overflow-hidden">
      <div className="h-full aspect-1">
        {image ? (
          <Image
            src={image}
            alt={text}
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageUploader
            id={`option-${id}`}
            multiple={false}
            handleChangeInState={handleChangeImage}
          >
            <div className="w-full h-full bg-accent flex justify-center items-center flex-col gap-2 text-center flex-shrink-0">
              <Button
                size={"smIcon"}
                variant={"default"}
                className="rounded-full pointer-events-none"
              >
                <ImageIcon size={20} />
              </Button>
            </div>
          </ImageUploader>
        )}
      </div>
      <div className="w-full flex-grow" onClick={handleInputWraperClick}>
        <input
          type="text"
          value={optionText}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full h-full border-none outline-none px-2 py-1 text-sm"
          ref={inputRef}
        />
      </div>
      <div className="flex gap-2 items-center pr-2">
        <OptionLimit value={optionText.length ?? 0} limit={36} />
        <Button
          size={"smIcon"}
          variant={"ghost"}
          onClick={handleDelete}
          className="rounded-full"
        >
          <DeleteIcon size={16} />
        </Button>
      </div>
    </div>
  );
});

export default ImagePollOption;
