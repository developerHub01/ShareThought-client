"use client";

import React, { MouseEvent, useState } from "react";
import SettingTab from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/SettingTab";
import PropertiesTab from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertiesTab";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import TopActionList from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/TopActionList";
import SidebarToogler from "@/app/(editor)/studio/create-blog/[id]/_components/SidebarToogler";
import { motion, AnimatePresence } from "motion/react";

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
  const [sidebarShowState, setSidebarShowState] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSidebarShowState((prev: boolean) => !prev);
  };

  return (
    <>
      <div className="w-6 h-full flex-shrink-0 flex-grow-0 relative bg-accent border border-l-2">
        <SidebarToogler state={sidebarShowState} toggleState={toggleSidebar} />
      </div>
      <AnimatePresence>
        {sidebarShowState && (
          <motion.section
            key="blog_editor_sidebar"
            initial={{ x: "100%", opacity: 0, width: "0" }}
            animate={{ x: 0, opacity: 1, width: "100%" }}
            exit={{ x: "100%", opacity: 0, width: "0" }}
            transition={{ duration: 0.3 }}
            className="h-full shadow-xl border-accent flex-grow-0 flex-shrink-0 bg-background w-full max-w-96"
          >
            <AnimatePresence>
              <SidebarTab />
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

const SidebarTab = () => {
  const [tab, setTab] = useState<string>("properties");

  const handleTab = (e: MouseEvent<HTMLButtonElement>) =>
    setTab(e.currentTarget.id);

  return (
    <section className="h-full flex flex-col">
      <div className="w-full flex-1 flex p-2 gap-2 border-b">
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
