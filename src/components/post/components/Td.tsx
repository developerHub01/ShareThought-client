import { cn } from "@/lib/utils";

interface TdProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

const Td = ({ children, className, ...props }: TdProps) => {
  return (
    <td
      {...props}
      className={cn(
        "p-3 md:p-1.5 min-h-8 break-words whitespace-normal",
        className
      )}
    >
      {children}&nbsp;
    </td>
  );
};

export default Td;
