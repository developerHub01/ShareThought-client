"use client";

import clsx from "clsx";
import { Button } from "@/components/ui/button";
import {
  Search as SearchIcon,
  X as CancelIcon,
  ArrowLeft as BackIcon,
} from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const iconMobileSize = 16;
const iconDesktopSize = 18;

const Searchbar = () => {
  const [query, setQuery] = useState<string>("");
  const [showSearchBarInMobile, setShowSearchBarInMobile] =
    useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) setShowSearchBarInMobile(false);

    if (showSearchBarInMobile) inputRef.current?.focus();
  }, [isMobile, showSearchBarInMobile]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e?.target?.value);

  const handleSubmitQuery = (e: FormEvent) => {
    e.preventDefault();
    setQuery("");
  };

  const handleCancelQuery = () => setQuery("");

  const handleOpenMobileSearchbar = () => setShowSearchBarInMobile(true);
  const handleCloseMobileSearchbar = () => setShowSearchBarInMobile(false);

  const iconSize = isMobile ? iconMobileSize : iconDesktopSize;

  return (
    <div className="flex justify-center items-center gap-1 flex-1">
      <Button
        type="button"
        variant={"ghost"}
        size={"icon"}
        className="flex-shrink-0 rounded-full aspect-square grid sm:hidden place-items-center ml-auto"
        onClick={handleOpenMobileSearchbar}
      >
        <SearchIcon size={iconSize} />
      </Button>
      <form
        className={clsx(
          "sm:relative sm:p-0 sm:flex w-full justify-center items-center gap-2 bg-white z-30",
          {
            "absolute w-full h-full top-0 left-0 p-1 flex":
              showSearchBarInMobile,
            "relative hidden": !showSearchBarInMobile,
          }
        )}
        onSubmit={handleSubmitQuery}
      >
        <Button
          type="button"
          variant={"ghost"}
          size={"icon"}
          className="flex-shrink-0 rounded-full aspect-square grid sm:hidden place-items-center size-8 p-1.5"
          onClick={handleCloseMobileSearchbar}
        >
          <BackIcon size={iconSize} strokeWidth={1.5} />
        </Button>
        <div className="flex w-full max-w-lg items-center rounded-sm border overflow-hidden gap-1">
          <input
            type="text"
            placeholder="Search"
            className="outline-none ps-2 sm:ps-3 pe-0.5 py-1 gap-1 text-gray-500 flex-1 w-full text-sm sm:text-base bg-transparent"
            value={query}
            onChange={handleInputChange}
            ref={inputRef}
          />
          <div className="w-8">
            {Boolean(query?.length) && (
              <Button
                type="button"
                variant={"ghost"}
                size={"icon"}
                className="rounded-full aspect-square flex-shrink-0 size-full text-gray-500"
                onClick={handleCancelQuery}
              >
                <CancelIcon size={iconSize} />
              </Button>
            )}
          </div>
          <Button
            type="submit"
            variant={"default"}
            size={"icon"}
            className="rounded-none px-3 sm:px-4 flex-shrink-0 w-auto"
          >
            <SearchIcon size={iconSize} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
