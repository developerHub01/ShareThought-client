import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import SettingTab from "@/app/(editor)/studio/create-blog/[id]/_components/SettingsTab/SettingTab";
import PropertiesTab from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertiesTab";

const EditorSidebar = () => {
  return (
    <section className="w-full h-full max-w-80 bg-accent shadow-xl border-accent flex-grow-0">
      <Tabs defaultValue="styles" className="w-full bg-primary-foreground">
        <TabsList className="grid w-full grid-cols-2 border-b">
          <TabsTrigger value="styles" className="capitalize">
            styles
          </TabsTrigger>
          <TabsTrigger value="settings" className="capitalize">
            settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="styles" className="mt-0">
          <PropertiesTab />
        </TabsContent>
        <TabsContent value="settings" className="mt-0">
          <SettingTab />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default EditorSidebar;
