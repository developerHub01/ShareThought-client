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
import MarginProperty from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Common/MarginProperty";
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
import RowStyles from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Row/Styles/RowStyles";
import ColumnStyles from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Column/Styles/ColumnStyles";
import RowLayout from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Row/Layout/RowLayout";
import ColumnLayout from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Column/Layout/ColumnLayout";
import HidePropertyInMobile from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/HidePropertyInMobile";
import CodeStyle from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/Code/Style/CodeStyle";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
  selectBlogImgLinkById,
} from "@/redux/features/builders/selectors";
import { memo } from "react";

const PropertiesTab = memo(() => {
  const { id: blogId } = useParams<{ id: string }>();

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );

  const activeComponent = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );
  const activeBlockImgLink = useAppSelector((state) =>
    selectBlogImgLinkById(state, blogId, activeBlock)
  );

  if (!activeBlock || !activeComponent) return null;

  console.log("PropertiesTab ============");

  return (
    <div className="w-full h-full">
      <Accordion type="multiple" className="h-full w-full">
        {["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(
          activeComponent.type
        ) && (
          <>
            <HidePropertyInMobile>
              <PropertyTypeWrapper id="typography_content" label="Content">
                <TypographyContent />
              </PropertyTypeWrapper>
            </HidePropertyInMobile>
            <PropertyTypeWrapper id="typography_style" label="Style">
              <TypographyStyle />
            </PropertyTypeWrapper>
          </>
        )}

        {activeComponent.type === "button" && (
          <>
            <HidePropertyInMobile>
              <PropertyTypeWrapper id="button_content" label="Content">
                <ButtonContent />
              </PropertyTypeWrapper>
            </HidePropertyInMobile>
            <PropertyTypeWrapper id="button_style" label="Style">
              <ButtonStyle />
            </PropertyTypeWrapper>
          </>
        )}

        <HidePropertyInMobile>
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
        </HidePropertyInMobile>

        <HidePropertyInMobile>
          {activeComponent.type === "image" && (
            <>
              <PropertyTypeWrapper id="image_content" label="Content">
                <ImageContent />
              </PropertyTypeWrapper>

              {activeBlockImgLink && (
                <>
                  <PropertyTypeWrapper id="image_layout" label="Layout">
                    <ImageLayout />
                  </PropertyTypeWrapper>
                  <PropertyTypeWrapper id="image_style" label="Styles">
                    <ImageStyles />
                  </PropertyTypeWrapper>
                </>
              )}

              {activeBlockImgLink && (
                <PropertyTypeWrapper id="image_filters" label="Filters">
                  <ImageFilters />
                </PropertyTypeWrapper>
              )}
            </>
          )}
        </HidePropertyInMobile>

        {activeComponent.type === "spacer" && (
          <PropertyTypeWrapper id="spacer_layout" label="Layout">
            <SpacerLayout />
          </PropertyTypeWrapper>
        )}

        <HidePropertyInMobile>
          {activeComponent.type === "divider" && (
            <PropertyTypeWrapper id="divider_layout" label="Layout">
              <DividerLayout />
            </PropertyTypeWrapper>
          )}
        </HidePropertyInMobile>

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

        {activeComponent.type === "row" && (
          <>
            <PropertyTypeWrapper id="row_layout" label="Layout">
              <RowLayout />
            </PropertyTypeWrapper>
            <HidePropertyInMobile>
              <PropertyTypeWrapper id="row_style" label="Styles">
                <RowStyles />
              </PropertyTypeWrapper>
            </HidePropertyInMobile>
          </>
        )}

        {activeComponent.type === "column" && (
          <>
            <PropertyTypeWrapper id="row_layout" label="Layout">
              <ColumnLayout />
            </PropertyTypeWrapper>
            <HidePropertyInMobile>
              <PropertyTypeWrapper id="column_style" label="Styles">
                <ColumnStyles />
              </PropertyTypeWrapper>
            </HidePropertyInMobile>
          </>
        )}

        {activeComponent.type === "code" && (
          <>
            <PropertyTypeWrapper id="code_style" label="Styles">
              <CodeStyle />
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
          "code",
        ].includes(activeComponent.type) && (
          <>
            <HidePropertyInMobile>
              <PropertyTypeWrapper id="box_shadow" label="Box Shadow">
                <BoxShadowProperty />
              </PropertyTypeWrapper>
            </HidePropertyInMobile>
            <PropertyTypeWrapper id="padding" label="Padding">
              <PaddingProperty />
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
          "button",
        ].includes(activeComponent.type) && (
          <PropertyTypeWrapper id="margin" label="Margin">
            <MarginProperty />
          </PropertyTypeWrapper>
        )}
      </Accordion>
    </div>
  );
});

export default PropertiesTab;
