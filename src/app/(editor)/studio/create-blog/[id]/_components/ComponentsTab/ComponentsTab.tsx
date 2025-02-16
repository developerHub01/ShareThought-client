import React from "react";
import ComponentList from "@/app/(editor)/studio/create-blog/[id]/_components/ComponentsTab/ComponentList";
import LayoutList from "@/app/(editor)/studio/create-blog/[id]/_components/ComponentsTab/LayoutList";

const ComponentsTab = () => {
  return (
    <div className="w-full p-4 flex flex-col gap-6">
      <ComponentList />
      <LayoutList />
    </div>
  );
};

export default ComponentsTab;
