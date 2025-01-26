import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BorderStyleType,
  BorderType,
} from "@/redux/features/builders/blogBuilderSlice";
import { ChangeEvent, FocusEvent } from "react";
import { ColorResult } from "react-color";
import ColorPicker from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ColorPicker";
import ValueCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ValueCounter";

interface BorderOptionBlockProps {
  type?: BorderType;
  label: string;
  style: BorderStyleType | undefined;
  size?: number | undefined;
  color?: string | undefined;
  onChangeStyle: (borderType: BorderType, style: BorderStyleType) => void;
  onChangeSize: (borderType: BorderType, value: number) => void;
  onIncreaseSize: (borderType: BorderType) => void;
  onDecreaseSize: (borderType: BorderType) => void;
  onBlurColor: (borderType: BorderType, color: string) => void;
  onChangeColor: (borderType: BorderType, color: string) => void;
  onColorPick: (borderType: BorderType, color: ColorResult) => void;
  minSize?: number;
  maxSize?: number;
}

const BorderOptionBlock = ({
  type: borderType = "border",
  label,
  style = "solid",
  size = 0,
  minSize = 0,
  maxSize = 30,
  color = "transparent",
  onChangeStyle,
  onChangeSize,
  onIncreaseSize,
  onDecreaseSize,
  onBlurColor,
  onChangeColor,
  onColorPick,
}: BorderOptionBlockProps) => {
  return (
    <div className="w-full flex flex-col gap-3 flex-wrap">
      <label className="text-sm capitalize">{label}</label>
      <div className="flex items-center gap-1.5 ml-auto">
        <Select
          defaultValue="solid"
          value={style}
          onValueChange={(value: BorderStyleType) =>
            onChangeStyle(borderType, value)
          }
        >
          <SelectTrigger className="min-w-24">
            <SelectValue placeholder="Border style" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectGroup>
              <SelectItem value="solid">Solid</SelectItem>
              <SelectItem value="dotted">Dotted</SelectItem>
              <SelectItem value="dashed">Dashed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <ValueCounter
          value={size}
          handleChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeSize(borderType, Number(e.target.value))
          }
          handleIncrement={() => onIncreaseSize(borderType)}
          handleDecrement={() => onDecreaseSize(borderType)}
          min={minSize}
          max={maxSize}
          separate={false}
        />
        <ColorPicker
          color={color}
          handleColorPicker={(color: ColorResult, _) =>
            onColorPick(borderType, color)
          }
          handleColorChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeColor(borderType, e.target.value)
          }
          handleColorBlur={(e: FocusEvent<HTMLInputElement>) =>
            onBlurColor(borderType, e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default BorderOptionBlock;
