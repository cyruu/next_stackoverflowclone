"use client";
import { Typography, Divider, Avatar } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Question = ({ question }: any) => {
  const {
    _id,
    details,
    createdAt,
    expect,
    title,
    votes,
    ansCount,
    userId,
    user,
  } = question;
  // const [userDetails, setUserDetails] = useState({ username: "", email: "" });
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  // get user data
  const { username, email } = user;
  // async function getQuestionUserData() {
  //   try {
  //     const res = await axios.post("/api/users/getUserDetails", {
  //       userId,
  //     });
  //     if (res.data.statusCode == 200) {
  //       setUserDetails(res.data.userDetails);
  //       console.log(res.data.userDetails);
  //     } else {
  //       console.log(res.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // useEffect(() => {
  //   getQuestionUserData();
  // }, []);
  return (
    <div
      className="flex flex-col items-start mb-10 pb-3 mx-7 sm:mx-0 sm:flex-row"
      style={{ borderBottom: "1px solid #DADADA" }}
    >
      <div className="vote-answer  mr-5 mt-2 flex sm:flex-col">
        <Typography variant="body2" className="mb-1 text-right mr-3 sm:mr-0">
          {votes} vote
        </Typography>
        <Typography variant="body2" className="text-right">
          {ansCount} answers
        </Typography>
      </div>
      <div className="questiondetails  flex-1 w-full">
        <Link href="/questions">
          <Typography className="text-blue-500" sx={{ fontSize: "1.2rem" }}>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2">{details}</Typography>
        <div className="footer">
          <div className="flex justify-end  items-center">
            <div
              style={{ fontSize: ".8rem" }}
              className=" flex items-center text-gray-500"
            >
              <Avatar
                sx={{ height: "20px", width: "20px" }}
                className="mr-1 text-sm bg-green-600 "
              >
                {username[0]}
              </Avatar>
              {username} at
            </div>
            <Typography
              sx={{ fontSize: ".8rem" }}
              className="text-gray-500 ml-1"
            >
              {year}/{month}/{day}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
