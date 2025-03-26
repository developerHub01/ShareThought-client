"use client";

import React from "react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ThreeVerticalDotIcon } from "@/lib/icons";
import { ICTAMenuItem, IPopoverPosition } from "@/types";

const CardCTAButton = ({
  ctaMenuItems,
  position = {
    align: "end",
    side: "top",
  },
}: {
  ctaMenuItems: Array<ICTAMenuItem>;
  position?: IPopoverPosition;
}) => {
  return (
    <Menubar className="p-0 border-none bg-transparent flex-shrink-0">
      <MenubarMenu>
        <MenubarTrigger className="outline-none transition-all duration-75 rounded-full min-h-10 min-w-10 grid place-items-center relative before:content-[''] before:absolute before:size-full before:rounded-full before:transition-all before:duration-100 before:scale-0 hover:before:scale-100 focus:before:bg-transparent hover:before:bg-gray-500/20 p-1 cursor-pointer">
          <ThreeVerticalDotIcon
            size={22}
            strokeWidth={1.2}
            className="text-primary-500"
          />
        </MenubarTrigger>
        <MenubarContent
          className="p-0 py-1 rounded-sm shadow-md"
          align={position.align}
          side={position.side}
        >
          {ctaMenuItems?.map(({ id, Icon, label, type, onClick }) => (
            <React.Fragment key={id}>
              {type === "separator" ? (
                <MenubarSeparator className="bg-gray-500/10" />
              ) : (
                <MenubarItem
                  className="cursor-pointer rounded-none flex gap-2 p-2.5 focus:bg-primary/5"
                  onClick={onClick}
                >
                  {Icon && <Icon className="size-5" strokeWidth={1.2} />}
                  {label && <span className="capitalize text-sm">{label}</span>}
                </MenubarItem>
              )}
            </React.Fragment>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default CardCTAButton;
