import React from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { CodeThemeModeType } from "@/redux/features/builders/blogBuilderSlice";

const themeTypeList = [
  {
    id: "dark",
    label: "Dark",
  },
  {
    id: "light",
    label: "Light",
  },
];

interface CodeThemeTypeProps {
  label?: string;
  selectedTheme: CodeThemeModeType;
  handleChange: (value: CodeThemeModeType) => void;
}

const CodeThemeType = ({
  label,
  selectedTheme,
  handleChange,
}: CodeThemeTypeProps) => {
  return (
    <SelectBlock
      label={label ?? "Code Theme Type"}
      activeValue={selectedTheme ?? themeTypeList[0].id}
      itemList={themeTypeList}
      handleChange={(value) => handleChange(value as CodeThemeModeType)}
    />
  );
};

export default CodeThemeType;
