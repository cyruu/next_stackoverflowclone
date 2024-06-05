import React from "react";
import { Divider, Skeleton } from "@mui/material";

const SkeletonComponent = () => {
  return (
    <div className="mb-5 px-7 sm:p-0">
      <div className="skeleton flex w-full flex-col sm:flex-row ">
        <div className="votes flex flex-row w-[30%] items-start sm:flex-col sm:w-[10%]">
          <Skeleton className="w-full h-3 mr-3 sm:mr-0" />
          <Skeleton className="w-full h-3 mt-0" />
        </div>
        <div className="details flex-1 sm:ml-5">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-10" />
          <div className="flex items-center ">
            <Skeleton variant="circular" className="h-5 w-5 mr-2 ml-auto" />
            <Skeleton className="w-20 h-3" />
          </div>
        </div>
      </div>
      <Divider className="mt-4" />
    </div>
  );
};

export default SkeletonComponent;
