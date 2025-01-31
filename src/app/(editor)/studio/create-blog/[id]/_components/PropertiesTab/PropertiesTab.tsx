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

const PropertiesTab = () => {
  const { id: blogId } = useParams();
  const {
    activeBlock,
    components,
    metaData: { imgLinks },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId as string]);

  if (!activeBlock) return null;

  const activeComponent = components[activeBlock];

  return (
    <div className="w-full h-full">
      <Accordion type="multiple" className="h-full w-full">
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

            <PropertyTypeWrapper id="image_content" label="Content">
              <ImageContent />
            </PropertyTypeWrapper>

            {imgLinks && imgLinks[activeBlock] && (
              <PropertyTypeWrapper id="image_filters" label="Filters">
                <ImageFilters />
              </PropertyTypeWrapper>
            )}
          </>
        )}

        <PropertyTypeWrapper id="padding" label="Padding">
          <PaddingProperty />
        </PropertyTypeWrapper>
      </Accordion>
    </div>
  );
};

export default PropertiesTab;
