"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import useModifyQueryParams from "@/hooks/use-modify-query-params";

const CategoryTopDescriptionButton = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const { buildFullPath, modifyParams } = useModifyQueryParams();

  const handleSeeMore = useCallback(() => {
    return router.push(
      buildFullPath(modifyParams("set", "description", "true"))
    );
  }, [router, searchParams]);

  return (
    <Button variant={"link"} onClick={handleSeeMore} className="text-white">
      ...see more
    </Button>
  );
};

export default CategoryTopDescriptionButton;
