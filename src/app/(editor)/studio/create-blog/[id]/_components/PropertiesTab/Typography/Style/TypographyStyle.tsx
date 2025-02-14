import React from "react";

import TypographyStyleFontSize from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Style/TypographyStyleFontSize";
import TypographyStyleFontWeight from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Style/TypographyStyleFontWeight";
import TypographyStyleLetterSpacing from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Style/TypographyStyleLetterSpacing";
import TypographyStyleLineHeight from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Style/TypographyStyleLineHeight";
import TypographyStyleTextAlign from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Style/TypographyStyleTextAlign";
import TypographyStyleTextColor from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Style/TypographyStyleTextColor";
import TypographyStyleTextDirection from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Style/TypographyStyleTextDirection";
import TypographyStyleTextTransform from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Style/TypographyStyleTextTransform";

const TypographyStyle = () => {
  return (
    <div className="flex flex-col h-full">
      <TypographyStyleFontSize />
      <TypographyStyleFontWeight />
      <TypographyStyleTextColor />
      <TypographyStyleLetterSpacing />
      <TypographyStyleLineHeight />
      <TypographyStyleTextTransform />
      <TypographyStyleTextAlign />
      <TypographyStyleTextDirection />
    </div>
  );
};

export default TypographyStyle;
