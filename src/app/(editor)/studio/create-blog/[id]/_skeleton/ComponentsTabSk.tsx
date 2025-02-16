import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Title = () => {
  return <Skeleton className="h-10 w-40 rounded-md" />;
};

const ComponentsSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <Title />
      <div className="w-full grid grid-cols-2 gap-4">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="w-full aspect-square" />
          ))}
      </div>
    </div>
  );
};

const RowsSkeletonWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full flex gap-4">{children}</div>;
};

const Row = () => <Skeleton className="w-full h-14" />;

const RowsSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <Title />
      <div className="w-full flex flex-col gap-5">
        <RowsSkeletonWrapper>
          <Row />
        </RowsSkeletonWrapper>
        <RowsSkeletonWrapper>
          <Row />
          <Row />
          <Row />
        </RowsSkeletonWrapper>
        <RowsSkeletonWrapper>
          <Row />
          <Row />
        </RowsSkeletonWrapper>
        <RowsSkeletonWrapper>
          <Row />
          <Row />
          <Row />
          <Row />
        </RowsSkeletonWrapper>
      </div>
    </div>
  );
};

const ComponentsTabSk = () => {
  return (
    <div className="w-full h-full flex flex-col gap-7 p-3">
      <ComponentsSkeleton />
      <RowsSkeleton />
    </div>
  );
};

export default ComponentsTabSk;
