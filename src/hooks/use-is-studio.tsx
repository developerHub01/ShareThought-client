import { usePathname } from "next/navigation";

const useIsStudio = () => {
  const pathname = usePathname();
  return Boolean(pathname?.toLowerCase()?.split("/")[1] === "studio");
};

export default useIsStudio;
