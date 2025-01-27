import React, { ChangeEvent, useMemo } from "react";
import { Switch } from "@/components/ui/switch";
import PropertyWrapper_v1 from "../PropertiesTab/PropertyWrapper_v1";
import { BorderRadiusType } from "@/redux/features/builders/blogBuilderSlice";
import ValueCounter from "../PropertiesTab/ValueCounter";

interface BorderRadiusBlockProps {
  borderRadius: Partial<Record<BorderRadiusType, number>>;
  handleChange: (
    borderRadius: Partial<Record<BorderRadiusType, number | "inc" | "dec">>
  ) => void;
  handleToggleMore: () => void;
}

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
              value={borderRadius.borderRadius || 0}
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
            <CounterWrapper label="Top Left">
              <ValueCounter
                value={borderRadius.borderTopLeftRadius || 0}
                handleIncrement={() =>
                  handleChange({ borderTopLeftRadius: "inc" })
                }
                handleDecrement={() =>
                  handleChange({ borderTopLeftRadius: "dec" })
                }
                handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange({
                    borderTopLeftRadius: Number(e.target.value ?? 0),
                  })
                }
              />
            </CounterWrapper>
            <CounterWrapper label="Top Right">
              <ValueCounter
                value={borderRadius.borderTopRightRadius || 0}
                handleIncrement={() =>
                  handleChange({ borderTopRightRadius: "inc" })
                }
                handleDecrement={() =>
                  handleChange({ borderTopRightRadius: "dec" })
                }
                handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange({
                    borderTopRightRadius: Number(e.target.value ?? 0),
                  })
                }
              />
            </CounterWrapper>
            <CounterWrapper label="Bottom Left">
              <ValueCounter
                value={borderRadius.borderBottomLeftRadius || 0}
                handleIncrement={() =>
                  handleChange({ borderBottomLeftRadius: "inc" })
                }
                handleDecrement={() =>
                  handleChange({ borderBottomLeftRadius: "dec" })
                }
                handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange({
                    borderBottomLeftRadius: Number(e.target.value ?? 0),
                  })
                }
              />
            </CounterWrapper>
            <CounterWrapper label="Bottom Right">
              <ValueCounter
                value={borderRadius.borderBottomRightRadius || 0}
                handleIncrement={() =>
                  handleChange({ borderBottomRightRadius: "inc" })
                }
                handleDecrement={() =>
                  handleChange({ borderBottomRightRadius: "dec" })
                }
                handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange({
                    borderBottomRightRadius: Number(e.target.value ?? 0),
                  })
                }
              />
              .
            </CounterWrapper>
          </>
        )}
      </div>
    </PropertyWrapper_v1>
  );
};

interface CounterWrapperProps {
  label: string;
  children: React.ReactNode;
}

const CounterWrapper = ({ label, children }: CounterWrapperProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      {children}
    </div>
  );
};

export default BorderRadiusBlock;
