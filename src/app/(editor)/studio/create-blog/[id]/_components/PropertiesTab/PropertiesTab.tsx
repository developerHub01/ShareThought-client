"use client";

import { Accordion } from "@/components/ui/accordion";
import TableLayout from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Layout/TableLayout";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import TableHeader from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Header/TableHeader";
import TableContent from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Table/Content/TableContent";
import PropertyTypeWrapper from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyTypeWrapper";
import ImageStyles from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Style/ImageStyles";
import ImageContent from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Content/ImageContent";
import PaddingProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/PaddingProperty";
import ImageFilters from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Filters/ImageFilters";
import ImageLayout from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Image/Layout/ImageLayout";
import SpacerLayout from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Spacer/Layout/SpacerLayout";
import DividerLayout from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Divider/Layout/DividerLayout";
import AccordionLayout from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Accordion/Layout/AccordionLayout";
import AccordionBody from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Accordion/Body/AccordionBody";
import AccordionTitle from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Accordion/Title/AccordionTitle";
import AccordionContent from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Accordion/Content/AccordionContent";
import AccordionContainer from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Accordion/Container/AccordionContainer";
import BoxShadowProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/BoxShadowProperty";
import TypographyContent from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Content/TypographyContent";
import TypographyStyle from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Typography/Style/TypographyStyle";
import ButtonContent from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Button/Content/ButtonContent";
import ButtonStyle from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Button/Style/ButtonStyle";

const PropertiesTab = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const {
    activeBlock,
    components,
    metaData: { imgLinks },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const activeComponent = components[activeBlock];

  return (
    <div className="w-full h-full">
      <Accordion type="multiple" className="h-full w-full">
        {["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(
          activeComponent.type
        ) && (
          <>
            <PropertyTypeWrapper id="typography_content" label="Content">
              <TypographyContent />
            </PropertyTypeWrapper>
            <PropertyTypeWrapper id="typography_style" label="Style">
              <TypographyStyle />
            </PropertyTypeWrapper>
          </>
        )}

        {activeComponent.type === "button" && (
          <>
            <PropertyTypeWrapper id="button_content" label="Content">
              <ButtonContent />
            </PropertyTypeWrapper>
            <PropertyTypeWrapper id="button_style" label="Style">
              <ButtonStyle />
            </PropertyTypeWrapper>
          </>
        )}

        {activeComponent.type === "table" && (
          <>
            <PropertyTypeWrapper id="table_layout" label="Layout">
              <TableLayout />
            </PropertyTypeWrapper>
            <PropertyTypeWrapper id="table_header" label="Header">
              <TableHeader />
            </PropertyTypeWrapper>
            <PropertyTypeWrapper id="table_content" label="Content">
              <TableContent />
            </PropertyTypeWrapper>
          </>
        )}

        {activeComponent.type === "image" && (
          <>
            <PropertyTypeWrapper id="image_content" label="Content">
              <ImageContent />
            </PropertyTypeWrapper>

            {imgLinks && imgLinks[activeBlock] && (
              <>
                <PropertyTypeWrapper id="image_layout" label="Layout">
                  <ImageLayout />
                </PropertyTypeWrapper>
                <PropertyTypeWrapper id="image_style" label="Styles">
                  <ImageStyles />
                </PropertyTypeWrapper>
              </>
            )}

            {imgLinks && imgLinks[activeBlock] && (
              <PropertyTypeWrapper id="image_filters" label="Filters">
                <ImageFilters />
              </PropertyTypeWrapper>
            )}
          </>
        )}

        {activeComponent.type === "spacer" && (
          <PropertyTypeWrapper id="spacer_layout" label="Layout">
            <SpacerLayout />
          </PropertyTypeWrapper>
        )}

        {activeComponent.type === "divider" && (
          <PropertyTypeWrapper id="divider_layout" label="Layout">
            <DividerLayout />
          </PropertyTypeWrapper>
        )}

        {activeComponent.type === "accordion" && (
          <>
            <PropertyTypeWrapper id="accordion_layout" label="Layout">
              <AccordionLayout />
            </PropertyTypeWrapper>
            <PropertyTypeWrapper id="accordion_container" label="Container">
              <AccordionContainer />
            </PropertyTypeWrapper>
            <PropertyTypeWrapper id="accordion_body" label="Body">
              <AccordionBody />
            </PropertyTypeWrapper>
            <PropertyTypeWrapper id="accordion_title" label="Title">
              <AccordionTitle />
            </PropertyTypeWrapper>
            <PropertyTypeWrapper id="accordion_content" label="Content">
              <AccordionContent />
            </PropertyTypeWrapper>
          </>
        )}

        {[
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "p",
          "table",
          "image",
          "divider",
          "accordion",
        ].includes(activeComponent.type) && (
          <>
            <PropertyTypeWrapper id="padding" label="Padding">
              <PaddingProperty />
            </PropertyTypeWrapper>
            <PropertyTypeWrapper id="box_shadow" label="Box Shadow">
              <BoxShadowProperty />
            </PropertyTypeWrapper>
          </>
        )}
      </Accordion>
    </div>
  );
};

export default PropertiesTab;
