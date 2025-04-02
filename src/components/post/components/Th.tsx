import { cn } from "@/lib/utils";

interface ThProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

const Th = ({ children, className, ...props }: ThProps) => {
  return (
    <th
      {...props}
      className={cn(
        "p-3 md:p-1.5 min-h-8 break-words whitespace-normal",
        className
      )}
    >
      {children}&nbsp;
    </th>
  );
};

export default Th;
