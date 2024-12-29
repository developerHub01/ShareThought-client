"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Search as SearchIcon, X as CloseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "motion/react";

const HistorySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const { modifyParams, buildFullPath } = useModifyQueryParams();

  useEffect(() => {
    const queryParam = searchParams.get("query");
    if (queryParam) setSearchTerm(queryParam);
    else setSearchTerm("");
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
    const queryParams = modifyParams("delete", "query");
    const fullPath = buildFullPath(queryParams);
    router.push(fullPath);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryParams = modifyParams("append", "query", searchTerm);
    const fullPath = buildFullPath(queryParams);
    router.push(fullPath);
  };

  return (
    <div>
      <form
        className="w-full max-w-lg border-b-2 border-primary flex items-center py-0.5"
        onSubmit={handleSubmit}
      >
        <Button
          size={"icon"}
          variant={"ghost"}
          className="rounded-full flex-shrink-0"
          type="submit"
        >
          <SearchIcon size={18} />
        </Button>
        <Input
          placeholder="Search read history"
          className="border-0"
          value={searchTerm}
          onChange={handleChange}
        />
        <AnimatePresence>
          {searchTerm && (
            <motion.div
              key="read-history-search-clear"
              exit={{ opacity: 0, rotate: 90, filter: "blur(5)" }}
              transition={{ opacity: 1, rotate: 0, filter: "blur(0)" }}
            >
              <Button
                size={"icon"}
                variant={"ghost"}
                className="rounded-full flex-shrink-0"
                onClick={handleClear}
                type="button"
              >
                <CloseIcon size={18} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default HistorySearch;
