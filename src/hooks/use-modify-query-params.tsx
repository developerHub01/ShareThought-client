"use client";

/* 
References:

use-search-params
---------------------
https://nextjs.org/docs/app/api-reference/functions/use-search-params#examples

URLSearchParams
----------------------
https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    append
    ----------------------
    https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/append
    delete
    ----------------------
    https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/delete
    set
    ----------------------
    https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/set
*/

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type paramsActionType = "append" | "delete" | "set";

const useModifyQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const modifyParams = useCallback(
    (action: paramsActionType, key: string, value: string = "true") => {
      const params = new URLSearchParams(searchParams.toString());

      switch (action) {
        case "append":
          params.append(key, value);
          break;
        case "delete":
          params.delete(key);
          break;
        case "set":
          params.set(key, value);
          break;
      }

      return params.toString();
    },
    [router, searchParams]
  );

  const buildFullPath = useCallback(
    (queryParams: string) => {
      return `${pathname}?${queryParams}`;
    },
    [pathname, searchParams]
  );
  
  const joinPath = useCallback(
    (firstPath: string, queryParams: string) => {
      return `${firstPath}?${queryParams}`;
    },
    [searchParams]
  );

  return { modifyParams, buildFullPath, joinPath };
};

export default useModifyQueryParams;
