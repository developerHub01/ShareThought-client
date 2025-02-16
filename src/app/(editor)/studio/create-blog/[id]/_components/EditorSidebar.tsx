"use client";

import React, { memo, MouseEvent, useCallback, useState } from "react";
import SettingTab from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/SettingTab";
import PropertiesTab from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertiesTab";
import ComponentsTab from "@/app/(editor)/studio/create-blog/[id]/_components/ComponentsTab/ComponentsTab";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import TopActionList from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/TopActionList";
import SidebarToogler from "@/app/(editor)/studio/create-blog/[id]/_components/SidebarToogler";
import { motion, AnimatePresence } from "motion/react";

type TabType = "components" | "properties" | "settings";

interface ITabList {
  id: TabType;
  label: string;
}

const tabList: Array<ITabList> = [
  {
    id: "components",
    label: "Components",
  },
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

  const toggleSidebar = () => setSidebarShowState((prev: boolean) => !prev);

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

const SidebarTab = memo(() => {
  const [tab, setTab] = useState<TabType>("components");

  const handleTab = useCallback((value: TabType) => setTab(value), []);

  return (
    <section className="h-full flex flex-col">
      <TabHead tab={tab} onChange={handleTab} />
      <TopActionList />
      <TabContent tab={tab} />
    </section>
  );
});

interface TabBase {
  tab: TabType;
}

interface TabHeadProps extends TabBase {
  onChange: (value: TabType) => void;
}

const TabHead = memo(({ tab, onChange }: TabHeadProps) => {
  return (
    <div className="w-full flex-1 flex p-2 gap-2 border-b">
      {tabList.map(({ id, label }) => (
        <Button
          key={id}
          id={id}
          className="w-full capitalize"
          variant={id === tab ? "default" : "ghost"}
          aria-controls={`${id}-tab`}
          onClick={(e) => onChange(e.currentTarget.id as TabType)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
});

const TabContent = memo(({ tab }: TabBase) => {
  return (
    <ScrollArea className="h-full">
      <motion.div
        className="w-full h-full"
        key={tab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        {tab === "components" && <ComponentsTab />}
        {tab === "properties" && <PropertiesTab />}
        {tab === "settings" && <SettingTab />}
      </motion.div>
    </ScrollArea>
  );
});

export default EditorSidebar;
