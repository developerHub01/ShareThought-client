"use client";

import React from "react";
import { AddIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useModifyQueryParams from "@/hooks/use-modify-query-params";

const CreateChannelButton = () => {
  const router = useRouter();
  const { modifyParams, buildFullPath } = useModifyQueryParams();

  const handleNavigateCreateChannelQuery = (step: string = "1") =>
    router.push(buildFullPath(modifyParams("set", "create", step)));

  return (
    <Button size={"sm"} onClick={() => handleNavigateCreateChannelQuery()}>
      <AddIcon size={18} /> Create Channel
    </Button>
  );
};

export default CreateChannelButton;
