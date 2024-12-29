"use client";

import { useSearchParams } from "next/navigation";

const useIsActiveQuery = (param: string) => {
  const params = useSearchParams();

  return params.has(param);
};

export default useIsActiveQuery;
