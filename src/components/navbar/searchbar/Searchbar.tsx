"use client";

import clsx from "clsx";
import { Button } from "@/components/ui/button";
import {
  Search as SearchIcon,
  X as CancelIcon,
  ArrowLeft as BackIcon,
} from "lucide-react";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import { useRouter, useSearchParams } from "next/navigation";

const iconMobileSize = 16;
const iconDesktopSize = 18;

const Searchbar = () => {
  const [query, setQuery] = useState<string>("");
  const [showSearchBarInMobile, setShowSearchBarInMobile] =
    useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { joinPath, modifyParams } = useModifyQueryParams();

  useEffect(() => {
    if (!isMobile) setShowSearchBarInMobile(false);

    if (showSearchBarInMobile) inputRef.current?.focus();
  }, [isMobile, showSearchBarInMobile]);

  useEffect(() => {
    setQuery(searchParams.get("query") || "");
  }, [searchParams]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e?.target?.value);

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleCancelQuery = () => setQuery("");

  const handleSearch = () => {
    return router.push(
      joinPath("/result", modifyParams("set", "query", query))
    );
  };
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
      <div
        className={clsx(
          "sm:relative sm:p-0 sm:flex w-full justify-center items-center gap-2 bg-white z-30",
          {
            "absolute w-full h-full top-0 left-0 p-1 flex":
              showSearchBarInMobile,
            "relative hidden": !showSearchBarInMobile,
          }
        )}
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
        <div className="flex w-full max-w-lg items-center rounded-sm overflow-hidden gap-1 bg-accent shadow-inner">
          <input
            type="text"
            placeholder="Search"
            className="outline-none ps-2 sm:ps-3 pe-0.5 py-1 gap-1 text-gray-500 flex-1 w-full text-sm sm:text-base bg-transparent placeholder:select-none"
            value={query}
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
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
            type="button"
            variant={"default"}
            size={"icon"}
            onClick={handleSearch}
            className="rounded-none px-3 sm:px-4 flex-shrink-0 w-auto h-8 sm:h-9 md:h-10"
          >
            <SearchIcon size={iconSize} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
