import React from "react";
import SearchResult from "@/app/(home)/result/_components/SearchResult";

const page = async ({ searchParams }: { searchParams: { query?: string } }) => {
  const query = searchParams.query;

  return (
    <section className="mx-auto w-full max-w-5xl">
      {query ? <SearchResult /> : <>Result not found</>}
    </section>
  );
};

export default page;
