"use client";

import { selectBlogActiveComponentFullPath } from "@/redux/features/builders/selectors";
import { useAppSelector } from "@/redux/hooks";

const useGetComponentFullPath = (blogId: string) => {
  const fullPath = useAppSelector((state) =>
    selectBlogActiveComponentFullPath(state, blogId)
  );

  return fullPath;
};

export default useGetComponentFullPath;
