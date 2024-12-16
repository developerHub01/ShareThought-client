import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { Eye as PreviewIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const PreviewButton = () => {
  const pathname = usePathname();

  return (
    <Link
      href={`${pathname}/preview`}
      target="_blank"
      className="fixed right-1 bottom-1"
    >
      <Button>
        <PreviewIcon /> preview
      </Button>
    </Link>
  );
};
export default PreviewButton