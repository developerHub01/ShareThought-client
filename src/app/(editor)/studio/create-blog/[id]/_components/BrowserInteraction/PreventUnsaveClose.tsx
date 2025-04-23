import React from "react";
import PreventBeforeUnload from "@/components/ui/prevent-before-unload";

const PreventUnsaveClose = () => {
  return <PreventBeforeUnload prevent={true} />;
};

export default PreventUnsaveClose;
