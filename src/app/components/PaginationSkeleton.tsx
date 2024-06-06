import React from "react";
import { Skeleton } from "@mui/material";

const PaginationSkeleton = () => {
  return (
    <div className=" w-full hidden sm:flex justify-center items-center">
      <div className="flex">
        <Skeleton variant="rounded" className="w-[22px] h-[22px] mx-0.5" />
        <Skeleton variant="rounded" className="w-[22px] h-[22px] mx-0.5" />
        <Skeleton variant="rounded" className="w-[22px] h-[22px] mx-0.5" />

        <Skeleton variant="rounded" className="w-[22px] h-[22px] mx-0.5" />
        <Skeleton variant="rounded" className="w-[22px] h-[22px] mx-0.5" />
      </div>
    </div>
  );
};

export default PaginationSkeleton;
