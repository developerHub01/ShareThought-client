import { usePathname } from "next/navigation";

const useIsStudioPost = () => {
  const pathname = usePathname();
  return Boolean(pathname?.split("/studio/")[1]?.split("/")[0]);
};

export default useIsStudioPost;
