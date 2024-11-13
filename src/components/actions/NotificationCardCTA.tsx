"use client";

import React from "react";
import CardCTAButton from "../buttons/CardCTAButton";
import {
  BellOff as NotificationOffIcon,
  EyeOff as HideIcon,
} from "lucide-react";
import { ICTAMenuItem, IPopoverPosition } from "@/types";

type TPostType =
  | "POST_NOTIFICATION"
  | "COMMENT_REPLY_NOTIFICATION"
  | "COMMENT_REACTION_NOTIFICATION";

interface INotificationCardCTA {
  notificationType: TPostType;
  position?: IPopoverPosition;
}

const findCTAMenuItems = (postType: TPostType): Array<ICTAMenuItem> => {
  switch (postType) {
    case "POST_NOTIFICATION":
      return [
        {
          id: "hide_this_notification",
          label: "hide this notification",
          Icon: HideIcon,
          onClick: () => console.log("hide this notification clicked"),
        },
        {
          id: "turn_off_all_from_this_channel",
          label: "turn off all from this channel",
          Icon: NotificationOffIcon,
          onClick: () => console.log("turn off all from this channel"),
        },
      ];
    case "COMMENT_REPLY_NOTIFICATION":
      return [
        {
          id: "hide_this_notification",
          label: "hide this notification",
          Icon: HideIcon,
          onClick: () => console.log("hide this notification clicked"),
        },
        {
          id: "turn_off_all_from_this_channel",
          label: "turn off all from this channel",
          Icon: NotificationOffIcon,
          onClick: () => console.log("turn off all from this channel"),
        },
      ];
    case "COMMENT_REACTION_NOTIFICATION":
      return [
        {
          id: "hide_this_notification",
          label: "hide this notification",
          Icon: HideIcon,
          onClick: () => console.log("hide this notification clicked"),
        },
        {
          id: "turn_off_all_from_this_channel",
          label: "turn off all from this channel",
          Icon: NotificationOffIcon,
          onClick: () => console.log("turn off all from this channel"),
        },
      ];
  }
};

const NotificationCardCTA = ({
  notificationType,
  position,
}: INotificationCardCTA) => {
  const ctaMenuItems = findCTAMenuItems(notificationType);

  return <CardCTAButton ctaMenuItems={ctaMenuItems} position={position} />;
};

export default NotificationCardCTA;
