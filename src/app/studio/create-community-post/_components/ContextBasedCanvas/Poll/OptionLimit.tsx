import React from "react";

interface OptionLimitProps {
  limit: number;
  value: number;
}

const OptionLimit = ({ value, limit }: OptionLimitProps) => {
  return (
    <p className="text-xs sm:text-sm select-none text-foreground/70">
      {value}/{limit}
    </p>
  );
};

export default OptionLimit;
