import React from "react";

interface PropertyWrapper_v1Props {
  children: React.ReactNode;
  className?: string;
}
const PropertyWrapper_v1 = ({ children }: PropertyWrapper_v1Props) => {
  return (
    <div className="flex justify-between items-center gap-2 px-3 py-1.5 border-b">
      {children}
    </div>
  );
};

export default PropertyWrapper_v1;
