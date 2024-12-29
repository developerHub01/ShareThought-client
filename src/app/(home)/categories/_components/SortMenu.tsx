"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";

const SortMenu = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { modifyParams, buildFullPath } = useModifyQueryParams();

  const menuList = useMemo(
    () => [
      {
        id: "latest",
        label: "Latest Added",
      },
      {
        id: "old",
        label: "Olderst Added",
      },
      {
        id: "a-z",
        label: "Alphabetical (A-Z)",
      },
    ],
    []
  );

  const activeItem = useMemo(
    () => searchParams.get("sorts") || menuList[0].id,
    [searchParams]
  );

  const handleMenuValueChange = (id: string) =>
    router.push(buildFullPath(modifyParams("set", "sort", id)));

  return (
    <Select defaultValue={activeItem} onValueChange={handleMenuValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          {menuList.map(({ id, label }) => (
            <SelectItem key={id} value={id}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortMenu;
