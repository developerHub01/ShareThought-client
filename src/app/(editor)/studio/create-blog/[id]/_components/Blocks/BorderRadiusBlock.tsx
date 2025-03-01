"use client";

import React, { ChangeEvent, useMemo } from "react";
import { Switch } from "@/components/ui/switch";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import { BorderRadiusType } from "@/redux/features/builders/blogBuilderSlice";
import ValueCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ValueCounter";
import CounterWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CounterWrapper";

interface BorderRadiusBlockProps {
  borderRadius: Partial<Record<BorderRadiusType, number>>;
  handleChange: (
    borderRadius: Partial<Record<BorderRadiusType, number | "inc" | "dec">>
  ) => void;
  handleToggleMore: () => void;
}

const borderRadiusList: Array<{
  id: BorderRadiusType;
  label: string;
}> = [
  {
    id: "borderTopLeftRadius",
    label: "Top Left",
  },
  {
    id: "borderTopRightRadius",
    label: "Top Right",
  },
  {
    id: "borderBottomLeftRadius",
    label: "Bottom Left",
  },
  {
    id: "borderBottomRightRadius",
    label: "Bottom Right",
  },
];

const BorderRadiusBlock = ({
  borderRadius,
  handleChange,
  handleToggleMore,
}: BorderRadiusBlockProps) => {
  const showOnlyAllRadius = useMemo(
    () =>
      [
        borderRadius.borderTopLeftRadius,
        borderRadius.borderTopRightRadius,
        borderRadius.borderBottomLeftRadius,
        borderRadius.borderBottomRightRadius,
      ].some((BorderRadius) => typeof BorderRadius === "number"),
    [borderRadius]
  );

  return (
    <PropertyWrapper_v1 className="flex flex-col gap-3">
      <div className="w-full flex justify-between items-center gap-3 flex-wrap">
        <label htmlFor="border_radius" className="text-sm">
          Border radius
        </label>
        <Switch
          id="border_radius"
          checked={Boolean(showOnlyAllRadius)}
          onCheckedChange={handleToggleMore}
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
        {!showOnlyAllRadius && (
          <CounterWrapper label="All Sides">
            <ValueCounter
              min={0}
              value={borderRadius.borderRadius ?? 0}
              handleIncrement={() => handleChange({ borderRadius: "inc" })}
              handleDecrement={() => handleChange({ borderRadius: "dec" })}
              handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange({ borderRadius: Number(e.target.value ?? 0) })
              }
            />
          </CounterWrapper>
        )}
        {showOnlyAllRadius && (
          <>
            {borderRadiusList.map(({ id, label }) => (
              <CounterWrapper key={id} label={label}>
                <ValueCounter
                  value={borderRadius[id] ?? 0}
                  handleIncrement={() =>
                    handleChange({
                      [id]: "inc",
                    })
                  }
                  handleDecrement={() =>
                    handleChange({
                      [id]: "dec",
                    })
                  }
                  handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange({
                      [id]: Number(e.target.value ?? 0),
                    })
                  }
                />
              </CounterWrapper>
            ))}
          </>
        )}
      </div>
    </PropertyWrapper_v1>
  );
};

export default BorderRadiusBlock;
