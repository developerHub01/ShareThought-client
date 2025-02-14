import React from "react";

import TypographyFontSize from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Content/TypographyContentFontSize";
import TypographyFontWeight from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Content/TypographyContentFontWeight";
import TypographyLetterSpacing from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Content/TypographyContentLetterSpacing";
import TypographyLineHeight from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Content/TypographyContentLineHeight";
import TypographyTextAlign from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Content/TypographyContentTextAlign";
import TypographyTextColor from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Content/TypographyContentTextColor";
import TypographyTextDirection from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Content/TypographyContentTextDirection";
import TypographyContentType from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Content/TypographyContentType";
import TypographyContentTextTransform from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Content/TypographyContentTextTransform";

const TypographyContent = () => {
  return (
    <div className="flex flex-col h-full">
      <TypographyContentType />
      <TypographyFontSize />
      <TypographyFontWeight />
      <TypographyTextColor />
      <TypographyLetterSpacing />
      <TypographyLineHeight />
      <TypographyContentTextTransform />
      <TypographyTextAlign />
      <TypographyTextDirection />
    </div>
  );
};

export default TypographyContent;
