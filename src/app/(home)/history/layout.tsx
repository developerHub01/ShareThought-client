import Heading_v1 from "@/components/headings/Heading_v1";
import PageHeadingWrapper from "@/components/headings/PageHeadingWrapper";
import React from "react";
import HistorySettingPopOver from "@/app/(home)/history/_components/HistorySettingPopOver";
import SecondarySearchbar from "@/components/Inputs/SecondarySearchbar";

interface HistoryLayoutProps {
  children: React.ReactNode;
}

const HistoryLayout = ({ children }: HistoryLayoutProps) => {
  return (
    <section className="mx-auto w-full max-w-7xl pb-5">
      <PageHeadingWrapper>
        <Heading_v1>Read History</Heading_v1>
        <HistorySettingPopOver />
      </PageHeadingWrapper>
      <section className="flex flex-col gap-5">
        <SecondarySearchbar label="Search read history" />
        {children}
      </section>
    </section>
  );
};

export default HistoryLayout;
