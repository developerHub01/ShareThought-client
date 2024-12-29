import React from "react";
import HistoryList from "@/app/(home)/history/_components/HistoryList";
import HistorySearch from "@/app/(home)/history/_components/HistorySearch";

const HistoryPage = () => {
  return (
    <section className="flex flex-col gap-5">
      <HistorySearch />
      <HistoryList />
    </section>
  );
};

export default HistoryPage;
