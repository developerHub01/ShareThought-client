import Image from "next/image";
import React from "react";

const ChannelBanner = () => {
  const banner =
    "https://images.unsplash.com/photo-1734197294272-71acf8e2ae79?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <section className="w-full overflow-hidden aspect-[1070/305] bg-slate-900">
      <Image
        src={banner}
        width={1070}
        height={305}
        alt=""
        className="w-full h-full object-cover"
      />
    </section>
  );
};

export default ChannelBanner;
