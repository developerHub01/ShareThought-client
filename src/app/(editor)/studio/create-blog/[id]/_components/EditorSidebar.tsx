"use client";

import React, { MouseEvent, useState } from "react";
import SettingTab from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/SettingTab";
import PropertiesTab from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertiesTab";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import TopActionList from "./PropertiesTab/TopActionList";

interface ITabList {
  id: string;
  label: string;
}

const tabList: Array<ITabList> = [
  {
    id: "properties",
    label: "Properties",
  },
  {
    id: "settings",
    label: "Settings",
  },
];

const EditorSidebar = () => {
  const [tab, setTab] = useState<string>("properties");

  const handleTab = (e: MouseEvent<HTMLButtonElement>) =>
    setTab(e.currentTarget.id);

  return (
    <section className="w-full h-full max-w-96 shadow-xl border-accent flex-grow-0 border-l-2 flex flex-col bg-background">
      <div className="flex p-2 gap-2 border-b">
        {tabList.map(({ id, label }) => (
          <Button
            key={id}
            id={id}
            className="w-full capitalize"
            variant={id === tab ? "default" : "ghost"}
            onClick={handleTab}
          >
            {label}
          </Button>
        ))}
      </div>
      <TopActionList />
      <ScrollArea className="h-full">
        {tab === "properties" && <PropertiesTab />}
        {tab === "settings" && <SettingTab />}
      </ScrollArea>
    </section>
  );
};

export default EditorSidebar;
