"use client";

import React from "react";
import CardCTAButton from "../buttons/CardCTAButton";
import {
  ArrowDownToLine as DownloadIcon,
  ClockIcon,
  Share2 as ShareIcon,
  Boxes as CategoryListIcon,
} from "lucide-react";
import { ICTAMenuItem } from "@/types";

const ctaMenuItems: Array<ICTAMenuItem> = [
  {
    id: "save_to_read_later",
    label: "save to read later",
    Icon: ClockIcon,
    onClick: () => console.log("save to read later clicked"),
  },
  {
    id: "save_to_category_list",
    label: "save to category list",
    Icon: CategoryListIcon,
    onClick: () => console.log("save to category list clicked"),
  },
  {
    id: "download",
    label: "download",
    Icon: DownloadIcon,
    onClick: () => console.log("download clicked"),
  },
  {
    id: "share",
    label: "share",
    Icon: ShareIcon,
    onClick: () => console.log("share clicked"),
  },
];

const ChannelPostCardCTA = () => {
  return <CardCTAButton ctaMenuItems={ctaMenuItems} />;
};

export default ChannelPostCardCTA;
