"use client";
import { Typography, Divider } from "@mui/material";
import React from "react";

const Question = ({ question }: any) => {
  return (
    <div
      className="flex flex-col items-start mb-10 pb-3 sm:flex-row "
      style={{ borderBottom: "1px solid #DADADA" }}
    >
      <div className="vote-answer  mr-5 mt-2 flex sm:flex-col">
        <Typography variant="body2" className="mb-1">
          1 vote
        </Typography>
        <Typography variant="body2">1 answers</Typography>
      </div>
      <div className="questiondetails ">
        <Typography variant="h6">title</Typography>
        <Typography variant="body2">details</Typography>
        <div className="footer">
          <Typography variant="body2">sdf</Typography>
        </div>
      </div>
    </div>
  );
};

export default Question;
