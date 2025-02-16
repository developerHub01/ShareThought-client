import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Title = () => {
  return <Skeleton className="h-10 w-40 rounded-md" />;
};

const settingTabListCount = [3, 2, 4];

const SettingsTabSk = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 p-3">
      {settingTabListCount.map((size, index) => (
        <React.Fragment key={size}>
          <Title />
          <div className="w-full flex flex-col gap-3">
            {Array(size)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} className="w-full h-20" />
              ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SettingsTabSk;
