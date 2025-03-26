"use client";

import React from "react";
import CardCTAButton from "../buttons/CardCTAButton";
import {
  DownloadIcon,
  ClockIcon,
  ShareIcon,
  CategoryListIcon,
  ReportIcon,
  RemoveIcon,
  UpIcon,
  DownIcon,
  ChangeReactionIcon,
  EditIcon,
  LinkIcon,
} from "@/lib/icons";
import { ICTAMenuItem, IPopoverPosition } from "@/types";

type TPostType =
  | "CHANNEL_POST_CARD"
  | "POST_CARD"
  | "POST_CATEGORY_CARD"
  | "MY_POST_CATEGORY_CARD"
  | "HISTORY_POST_CARD"
  | "REACTED_POST_CARD"
  | "COMMUNITY_POST_CARD"
  | "My_COMMUNITY_POST_CARD"
  | "MY_CATEGORY_WRAPPER_CARD"
  | "CATEGORY_WRAPPER_CARD";

interface IPostCardCTA {
  postType: TPostType;
  position?: IPopoverPosition;
}

const findCTAMenuItems = (postType: TPostType): Array<ICTAMenuItem> => {
  switch (postType) {
    case "POST_CARD":
      return [
        {
          id: "copy_post_link",
          label: "copy link",
          Icon: LinkIcon,
          onClick: () => console.log("link clicked clicked"),
        },
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
          id: "copy_post_link",
          label: "copy link",
          Icon: LinkIcon,
          onClick: () => console.log("link clicked clicked"),
        },
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
          id: "copy_post_link",
          label: "copy link",
          Icon: LinkIcon,
          onClick: () => console.log("link clicked clicked"),
        },
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
          id: "copy_post_link",
          label: "copy link",
          Icon: LinkIcon,
          onClick: () => console.log("link clicked clicked"),
        },
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
    case "HISTORY_POST_CARD":
      return [
        {
          id: "copy_post_link",
          label: "copy link",
          Icon: LinkIcon,
          onClick: () => console.log("link clicked clicked"),
        },
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
          onClick: () => console.log("download clicked"),
        },
        {
          id: "remove_from_history",
          label: "remove from history",
          Icon: RemoveIcon,
          onClick: () => console.log("remove from history clicked"),
        },
        {
          id: "share",
          label: "share",
          Icon: ShareIcon,
          onClick: () => console.log("share clicked"),
        },
      ];
    case "REACTED_POST_CARD":
      return [
        {
          id: "copy_post_link",
          label: "copy link",
          Icon: LinkIcon,
          onClick: () => console.log("link clicked clicked"),
        },
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
          onClick: () => console.log("download clicked"),
        },
        {
          id: "remove_reaction",
          label: "remove reaction",
          Icon: RemoveIcon,
          onClick: () => console.log("remove reaction clicked"),
        },
        {
          id: "change_reaction",
          label: "change reaction",
          Icon: ChangeReactionIcon,
          onClick: () => console.log("remove reaction clicked"),
        },
        {
          id: "share",
          label: "share",
          Icon: ShareIcon,
          onClick: () => console.log("share clicked"),
        },
      ];
    case "COMMUNITY_POST_CARD":
      return [
        {
          id: "copy_post_link",
          label: "copy link",
          Icon: LinkIcon,
          onClick: () => console.log("link clicked clicked"),
        },
        {
          id: "edit_community_post",
          label: "edit",
          Icon: EditIcon,
          onClick: () => console.log("edit clicked"),
        },
        {
          id: "delete_community_post",
          label: "delete",
          Icon: RemoveIcon,
          onClick: () => console.log("delete clicked"),
        },
      ];
    case "My_COMMUNITY_POST_CARD":
      return [
        {
          id: "copy_post_link",
          label: "copy link",
          Icon: LinkIcon,
          onClick: () => console.log("link clicked clicked"),
        },
        {
          id: "report_community_post",
          label: "report",
          Icon: ReportIcon,
          onClick: () => console.log("report clicked"),
        },
      ];
    case "CATEGORY_WRAPPER_CARD":
      return [
        {
          id: "copy_post_link",
          label: "copy link",
          Icon: LinkIcon,
          onClick: () => console.log("link clicked clicked"),
        },
        {
          id: "report_community_post",
          label: "report",
          Icon: ReportIcon,
          onClick: () => console.log("report clicked"),
        },
      ];
    case "MY_CATEGORY_WRAPPER_CARD":
      return [
        {
          id: "copy_post_link",
          label: "copy link",
          Icon: LinkIcon,
          onClick: () => console.log("link clicked clicked"),
        },
        {
          id: "report_community_post",
          label: "report",
          Icon: ReportIcon,
          onClick: () => console.log("report clicked"),
        },
      ];
  }
};

const PostCardCTA = ({ postType, position }: IPostCardCTA) => {
  const ctaMenuItems = findCTAMenuItems(postType);

  return <CardCTAButton ctaMenuItems={ctaMenuItems} position={position} />;
};

export default PostCardCTA;
