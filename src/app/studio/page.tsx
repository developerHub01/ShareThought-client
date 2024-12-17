import AnalyticsSummery from "@/components/studio/dashboard/AnalyticsSummery";
import CreatePost from "@/components/studio/dashboard/CreatePost";
import LatestComments from "@/components/studio/dashboard/LatestComments";
import LatestPost from "@/components/studio/dashboard/LatestPost";
import LatestSubscribers from "@/components/studio/dashboard/LatestSubscribers";
import clsx from "clsx";
import React from "react";

const StudioDashboardPage = () => {
  return (
    <section className="mx-auto w-full max-w-7xl">
      <h1 className="text-xl text-primary font-bold pb-4">Channel dashboard</h1>
      <section className="flex flex-col md:flex-row gap-5 pb-5">
        <section className="w-full flex flex-col gap-5">
          <CreatePost />
          <LatestPost />
          <LatestSubscribers />
        </section>
        <section className="w-full flex flex-col gap-5">
          <AnalyticsSummery />
          <LatestComments />
        </section>
      </section>
    </section>
  );
};

interface SpecerProps {
  className?: string;
}

const Specer = ({ className = "" }: SpecerProps) => {
  return <div className={clsx("h-5", className)}></div>;
};

export default StudioDashboardPage;
