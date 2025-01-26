import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <section className={cn("w-full max-w-3xl mx-auto", className)}>
      {children}
    </section>
  );
};

export default Container;