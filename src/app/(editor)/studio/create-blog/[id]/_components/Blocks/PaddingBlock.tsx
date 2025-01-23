import React, { ChangeEvent, useMemo } from "react";
import { Switch } from "@/components/ui/switch";
import PropertyWrapper_v1 from "../PropertiesTab/PropertyWrapper_v1";
import { PaddingType } from "@/redux/features/builders/blogBuilderSlice";
import ValueCounter from "../PropertiesTab/ValueCounter";

interface PaddingBlockProps {
  padding: Partial<Record<PaddingType, number>>;
  handleChange: (
    padding: Partial<Record<PaddingType, number | "inc" | "dec">>
  ) => void;
  handleToggleMore: () => void;
}

const PaddingBlock = ({
  padding,
  handleChange,
  handleToggleMore,
}: PaddingBlockProps) => {
  const showOnlyAllPadding = useMemo(
    () =>
      [
        padding.paddingLeft,
        padding.paddingRight,
        padding.paddingTop,
        padding.paddingBottom,
      ].some((padding) => typeof padding === "number"),
    [padding]
  );

  return (
    <PropertyWrapper_v1 className="flex flex-col gap-3">
      <div className="w-full flex justify-between items-center gap-3 flex-wrap">
        <label htmlFor="padding" className="text-sm">
          Padding
        </label>
        <Switch
          id="padding"
          checked={Boolean(showOnlyAllPadding)}
          onCheckedChange={handleToggleMore}
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
        {!showOnlyAllPadding && (
          <CounterWrapper label="All Sides">
            <ValueCounter
              min={0}
              value={padding.padding || 0}
              handleIncrement={() => handleChange({ padding: "inc" })}
              handleDecrement={() => handleChange({ padding: "dec" })}
              handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange({ padding: Number(e.target.value ?? 0) })
              }
            />
          </CounterWrapper>
        )}
        {showOnlyAllPadding && (
          <>
            <CounterWrapper label="Top">
              <ValueCounter
                value={padding.paddingTop || 0}
                handleIncrement={() => handleChange({ paddingTop: "inc" })}
                handleDecrement={() => handleChange({ paddingTop: "dec" })}
                handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange({ paddingTop: Number(e.target.value ?? 0) })
                }
              />
            </CounterWrapper>
            <CounterWrapper label="Right">
              <ValueCounter
                value={padding.paddingRight || 0}
                handleIncrement={() => handleChange({ paddingRight: "inc" })}
                handleDecrement={() => handleChange({ paddingRight: "dec" })}
                handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange({ paddingRight: Number(e.target.value ?? 0) })
                }
              />
            </CounterWrapper>
            <CounterWrapper label="Bottom">
              <ValueCounter
                value={padding.paddingBottom || 0}
                handleIncrement={() => handleChange({ paddingBottom: "inc" })}
                handleDecrement={() => handleChange({ paddingBottom: "dec" })}
                handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange({ paddingBottom: Number(e.target.value ?? 0) })
                }
              />
            </CounterWrapper>
            <CounterWrapper label="Left">
              <ValueCounter
                value={padding.paddingLeft || 0}
                handleIncrement={() => handleChange({ paddingLeft: "inc" })}
                handleDecrement={() => handleChange({ paddingLeft: "dec" })}
                handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange({ paddingLeft: Number(e.target.value ?? 0) })
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

export default PaddingBlock;
