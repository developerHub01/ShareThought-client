import { useEffect, useState } from "react";

const useDrawerControll = (open: boolean = false) => {
  const [isMounted, setIsMounted] = useState(open);

  useEffect(() => {
    if (open) {
      setIsMounted(true);
    } else {
      const timeout = setTimeout(() => setIsMounted(false), 50);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!isMounted) return false;

  return true;
};

export default useDrawerControll;
