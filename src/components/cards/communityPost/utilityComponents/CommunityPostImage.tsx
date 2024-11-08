"use client";

import { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const imgUrls = [
  "https://images.unsplash.com/photo-1731000892655-5a0d52e8a43c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1730660666237-1e6a008067a9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1605465746300-0318f1e96278?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const CommunityPostImage = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleCarouselLeft = () => {
    api?.scrollPrev();
  };
  const handleCarouselRight = () => {
    api?.scrollNext();
  };

  return (
    <div className="w-full max-w-[600px] mx-auto relative">
      {imgUrls?.length > 1 ? (
        <>
          <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            className="w-full rounded-sm overflow-hidden"
          >
            <CarouselContent>
              {imgUrls?.map((imgUrl, index) => (
                <CarouselItem key={index}>
                  <AspectRatio ratio={1} className="bg-muted">
                    <Image
                      src={imgUrl}
                      alt="Photo by Drew Beamer"
                      fill
                      className="h-full w-full rounded-md object-cover select-none"
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <Button
            size={"icon"}
            onClick={handleCarouselLeft}
            variant={"outline"}
            className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border shadow-md"
          >
            <ChevronLeft />
          </Button>
          <Button
            size={"icon"}
            onClick={handleCarouselRight}
            variant={"outline"}
            className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 rounded-full border shadow-md"
          >
            <ChevronRight />
          </Button>
        </>
      ) : (
        <AspectRatio ratio={1} className="w-full">
          <Image
            src={imgUrls[0]}
            alt="Photo by Drew Beamer"
            fill
            className="h-full w-full rounded-md object-cover select-none"
          />
        </AspectRatio>
      )}
    </div>
  );
};

export default CommunityPostImage;
