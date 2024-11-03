"use client";

import React from "react";
import CardCTAButton from "../buttons/CardCTAButton";
import {
  ArrowDownToLine as DownloadIcon,
  ClockIcon,
  Share2 as ShareIcon,
  Boxes as CategoryListIcon,
  Flag as ReportIcon,
  Trash as RemoveIcon,
  ArrowUpToLine as UpIcon,
  ArrowDownToLine as DownIcon,
} from "lucide-react";
import { ICTAMenuItem } from "@/types";

type TPostType =
  | "CHANNEL_POST_CARD"
  | "POST_CARD"
  | "POST_CATEGORY_CARD"
  | "MY_POST_CATEGORY_CARD";

interface IPostCardCTA {
  postType: TPostType;
}

const findCTAMenuItems = (postType: TPostType): Array<ICTAMenuItem> => {
  switch (postType) {
    case "POST_CARD":
      return [
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
        {
          id: "separator1",
          type: "separator",
        },
        {
          id: "report",
          label: "report",
          Icon: ReportIcon,
          onClick: () => console.log("report clicked"),
        },
      ];
    case "CHANNEL_POST_CARD":
      return [
        {
          id: "save_to_read_later",
          label: "save to read later",
          Icon: ClockIcon,
          onClick: () => console.log("save to read later clicked"),
        },
        {
          id: "save_to_category",
          label: "save to category",
          Icon: CategoryListIcon,
          onClick: () => console.log("save to category clicked"),
        },
        {
          id: "download",
          label: "download",
          Icon: DownloadIcon,
          onClick: () => console.log("download"),
        },
        {
          id: "share",
          label: "share",
          Icon: ShareIcon,
          onClick: () => console.log("share clicked"),
        },
      ];
    case "POST_CATEGORY_CARD":
      return [
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
          onClick: () => console.log("save to category clicked"),
        },
        {
          id: "download",
          label: "download",
          Icon: DownloadIcon,
          onClick: () => console.log("download"),
        },
        {
          id: "share",
          label: "share",
          Icon: ShareIcon,
          onClick: () => console.log("share clicked"),
        },
      ];
    case "MY_POST_CATEGORY_CARD":
      return [
        {
          id: "save_to_read_later",
          label: "save to read later",
          Icon: ClockIcon,
          onClick: () => console.log("save to read later clicked"),
        },
        {
          id: "save_to_category",
          label: "save to category",
          Icon: CategoryListIcon,
          onClick: () => console.log("save to category clicked"),
        },
        {
          id: "remove_from_the_category",
          label: "remove from the category",
          Icon: RemoveIcon,
          onClick: () => console.log("remove from the category clicked"),
        },
        {
          id: "download",
          label: "download",
          Icon: DownloadIcon,
          onClick: () => console.log("download"),
        },
        {
          id: "share",
          label: "share",
          Icon: ShareIcon,
          onClick: () => console.log("share clicked"),
        },
        {
          id: "separator1",
          type: "separator",
        },
        {
          id: "move_to_up",
          label: "move to up",
          Icon: UpIcon,
          onClick: () => console.log("move to up clicked"),
        },
        {
          id: "move_to_down",
          label: "move to down",
          Icon: DownIcon,
          onClick: () => console.log("move to down clicked"),
        },
      ];
  }
};

const PostCardCTA = ({ postType }: IPostCardCTA) => {
  const ctaMenuItems = findCTAMenuItems(postType);

  return <CardCTAButton ctaMenuItems={ctaMenuItems} />;
};

export default PostCardCTA;
