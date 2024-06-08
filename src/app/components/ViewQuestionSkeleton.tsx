import { Skeleton } from "@mui/material";
import React from "react";

const ViewQuestionSkeleton = () => {
  return (
    <div className="px-7 mt-7 ml-0 sm:p-0 sm:ml-7">
      <div className="header">
        <Skeleton className="h-14" />
        <Skeleton className="w-20 h-4" />
      </div>
      <div className="content flex ">
        <div className="votes ">
          <Skeleton className="h-44 w-14 mr-5" />
        </div>
        <div className="votes flex-grow">
          <Skeleton className="h-20" />
          <Skeleton className="h-14" />
          <Skeleton className="h-44" />
          <Skeleton className="h-10" />
        </div>
      </div>
    </div>
  );
};

export default ViewQuestionSkeleton;
