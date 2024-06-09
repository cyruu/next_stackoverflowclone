"use client";
import { useState, useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import React from "react";

const Answer = ({ answer }: any) => {
  const { answerDetail, createdAt, username, votes } = answer;
  const [year, setyear] = useState<any>();
  const [month, setmonth] = useState<any>();
  const [day, setday] = useState<any>();
  const [hour, sethour] = useState<any>();
  const [minutes, setminutes] = useState<any>();
  useEffect(() => {
    const date = new Date(createdAt);
    setyear(date.getFullYear());
    setmonth(date.getMonth());
    setday(date.getDay());
    sethour(date.getHours());
    setminutes(date.getMinutes());
  }, []);
  return (
    <div className="answer mt-2">
      <div className="answerdetail mb-2">
        <Typography className="text-sm">
          {answerDetail}
          <span className="text-xs text-gray-400">
            {" "}
            -<span className="text-blue-700">{username}</span> {year}/{month}/
            {day} at {hour}:{minutes}
          </span>
        </Typography>
      </div>
      {/* <div className="footer mb-2">
        <Typography className="text-xs">{username}</Typography>
      </div> */}
      <Divider />
    </div>
  );
};

export default Answer;
