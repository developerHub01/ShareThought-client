"use client";

import React, {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import { useSharePost } from "@/app/studio/create-community-post/_context/SharePostProvider";
import { Button } from "@/components/ui/button";
import { CloseIcon, SearchIcon } from "@/lib/icons";
import AnimatedWrapper from "@/app/studio/create-community-post/_components/AnimatedWrapper";

const SharePostInput = memo(() => {
  const [inputValue, setInputValue] = useState<string>("");
  const { handleSearch, handleClearSearch } = useSharePost();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value),
    []
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      handleSearch(inputValue);
    },
    [inputValue]
  );

  const handleClear = useCallback(() => {
    handleClearSearch();
    setInputValue("");
  }, []);

  return (
    <div className="w-full bg-accent p-3">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-1 bg-primary-foreground border rounded-sm"
      >
        <AnimatedWrapper
          keyName="clear-button"
          direction="left"
          show={Boolean(inputValue.trim())}
        >
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            onClick={handleClear}
            className="flex-shrink-0"
          >
            <CloseIcon size={18} />
          </Button>
        </AnimatedWrapper>

        <Input
          className="border-none bg-transparent"
          placeholder="Search or past post link and enter..."
          value={inputValue}
          onChange={handleChange}
        />

        <AnimatedWrapper
          keyName="search-button"
          direction="right"
          show={Boolean(inputValue.trim())}
        >
          <Button
            type="submit"
            size={"icon"}
            className="rounded-l-none px-5 flex-shrink-0"
          >
            <SearchIcon size={18} />
          </Button>
        </AnimatedWrapper>
      </form>
    </div>
  );
});

export default SharePostInput;
