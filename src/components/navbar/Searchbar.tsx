"use client";

import clsx from "clsx";
import { Button } from "@/components/ui/button";
import {
  Search as SearchIcon,
  X as CancelIcon,
  Mic as MicIcon,
  ArrowLeft as BackIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface VoiceSearchComponentProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  iconSize: number;
}

const iconMobileSize = 16;
const iconDesktopSize = 18;

const Searchbar = () => {
  const [query, setQuery] = useState<string>("");
  const [showSearchBarInMobile, setShowSearchBarInMobile] =
    useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      setShowSearchBarInMobile(false);
      inputRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }, [isMobile]);

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
          "sm:relative sm:p-0 sm:flex w-full justify-center items-center gap-2 bg-white",
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
            className="outline-none ps-2 sm:ps-3 pe-0.5 py-1 gap-1 text-gray-500 flex-1 w-full text-sm sm:text-base"
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
        <VoiceSearchBox />
      </form>
    </div>
  );
};

const VoiceSearchBox = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const iconSize = isMobile ? iconMobileSize : iconDesktopSize;

  const VoiceSearchComponent = isMobile ? DrawerComponent : DialogComponent;

  return (
    <VoiceSearchComponent open={open} setOpen={setOpen} iconSize={iconSize} />
  );
};

const DialogComponent = ({
  open,
  setOpen,
  iconSize,
}: VoiceSearchComponentProps) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="rounded-full aspect-square flex-shrink-0 cursor-pointer"
      >
        <MicIcon size={iconSize} strokeWidth={1.5} />
      </Button>
    </DialogTrigger>
    <DialogContent className="rounded-sm flex flex-col gap-3">
      <DialogHeader className="hidden">
        <DialogTitle>Edit profile</DialogTitle>
      </DialogHeader>
      <VoiceSearchMain />
    </DialogContent>
  </Dialog>
);

const DrawerComponent = ({
  open,
  setOpen,
  iconSize,
}: VoiceSearchComponentProps) => (
  <Drawer open={open} onOpenChange={setOpen}>
    <DrawerTrigger asChild>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="rounded-full aspect-square flex-shrink-0 cursor-pointer"
      >
        <MicIcon size={iconSize} strokeWidth={1.5} />
      </Button>
    </DrawerTrigger>
    <DrawerContent className="fixed overflow-hidden inset-2 rounded-sm first:invisible border-0 max-h-80 mt-auto">
      <DrawerHeader className="text-left hidden">
        <DrawerTitle>Edit profile</DrawerTitle>
      </DrawerHeader>
      <VoiceSearchMain />
    </DrawerContent>
  </Drawer>
);

const VoiceSearchMain = () => {
  return (
    <>
      <h3>Listening...</h3>
      <div className="w-full h-full grid place-items-center">
        <Button size="icon" className="rounded-full size-20">
          <MicIcon size={40} />
        </Button>
      </div>
    </>
  );
};

export default Searchbar;
