"use client";

import { Button } from "@/components/ui/button";
import React, { useMemo } from "react";
import { Trash as ClearIcon, Pause as PauseIcon } from "lucide-react";

const HistorySetting = () => {
  const handleClearHistory = () => {
    console.log("clear read history");
  };

  const handlePauseHistory = () => {
    console.log("pause read history");
  };

  const actionList = useMemo(
    () => [
      {
        id: "clear",
        label: "Clear all read history",
        Icon: ClearIcon,
        onClick: handleClearHistory,
      },
      {
        id: "pause",
        label: "pause read history",
        Icon: PauseIcon,
        onClick: handlePauseHistory,
      },
    ],
    [handleClearHistory, handlePauseHistory]
  );

  return (
    <div className="p-5">
      <ul className="w-full flex justify-center items-center gap-3">
        {actionList.map(({ id, label, Icon, onClick }) => (
          <li key={id}>
            <Button onClick={onClick} variant={"outline"} className="w-full">
              <Icon size={18} /> {label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistorySetting;
