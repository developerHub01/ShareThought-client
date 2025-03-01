import React from "react";

interface CounterWrapperProps {
  label: string;
  children: React.ReactNode;
}

const CounterWrapper = ({ label, children }: CounterWrapperProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      {children}
    </div>
  );
};

export default CounterWrapper;
