import { Skeleton } from "@/components/ui/skeleton";
import React, { Fragment } from "react";

const NavigatorListSk = () => {
  return (
    <div className="p-1 flex flex-col gap-1">
      {Array(20)
        .fill(0)
        .map((_, index) => {
          return (
            <Fragment key={index}>
              {index ? (
                <Skeleton className="w-full h-10" />
              ) : (
                <div className="flex flex-col gap-1">
                  <Skeleton className="w-full h-10" />
                  <div className="pl-4 flex flex-col gap-1">
                    {Array(3)
                      .fill(0)
                      .map((_, index) => (
                        <Fragment key={index}>
                          {index ? (
                            <Skeleton key={index} className="w-full h-10" />
                          ) : (
                            <div className="flex flex-col gap-1">
                              <Skeleton className="w-full h-10" />
                              <div className="pl-4 flex flex-col gap-1">
                                {Array(2)
                                  .fill(0)
                                  .map((_, index) => (
                                    <Fragment key={index}>
                                      {index ? (
                                        <Skeleton
                                          key={index}
                                          className="w-full h-10"
                                        />
                                      ) : (
                                        <Skeleton
                                          key={index}
                                          className="w-full h-10"
                                        />
                                      )}
                                    </Fragment>
                                  ))}
                              </div>
                            </div>
                          )}
                        </Fragment>
                      ))}
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
    </div>
  );
};

export default NavigatorListSk;
