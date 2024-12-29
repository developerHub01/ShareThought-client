"use client";

import { useSearchParams } from "next/navigation";

const useIsActiveQuery = (param: string) => {
  const params = useSearchParams();

  return params.get(param) !== null && params.get(param) !== "false";
};

export default useIsActiveQuery;
