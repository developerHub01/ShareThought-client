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

const OrderByMenu = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { modifyParams, buildFullPath } = useModifyQueryParams();

  const menuList = useMemo(
    () => [
      {
        id: "latest",
        label: "Latest",
      },
      {
        id: "old",
        label: "Olderst",
      },
      {
        id: "popular",
        label: "Popular",
      },
    ],
    []
  );

  const activeItem = useMemo(
    () => searchParams.get("order") || menuList[0].id,
    [searchParams]
  );

  const handleMenuValueChange = (id: string) =>
    router.push(buildFullPath(modifyParams("set", "order", id)));

  return (
    <Select defaultValue={activeItem} onValueChange={handleMenuValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Order By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Order By</SelectLabel>
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

export default OrderByMenu;
