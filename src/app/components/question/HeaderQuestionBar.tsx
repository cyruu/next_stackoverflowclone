"use client";
import { Button, Typography, Divider } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const HeaderQuestionBar = ({
  setTotalPages,
  setQuestions,
  setLoading,
  filterMode,
  setFilterMode,
  setPage,
}: any) => {
  const cookieLoggedInUser = useSelector((state: any) => state.loggedInUser);

  function getNewQuestions() {
    setFilterMode("newest");
    setPage(1);
    // setLoading(true);

    // const res = await axios.post(`api/questions/getquestions`, {
    //   pageNo: 1,
    //   // zeroVotes: true,
    // });
    // if (res.data.statusCode == 200) {
    //   setTotalPages(res.data.totalPages);
    //   setQuestions(res.data.questions);
    //   setLoading(false);
    // }
  }
  function getUnansweredQuestions() {
    setFilterMode("unanswered");
    setPage(1);
    // setLoading(true);
    // const res = await axios.post(`api/questions/getquestions`, {
    //   pageNo: 1,
    //   zeroVotes: true,
    // });
    // if (res.data.statusCode == 200) {
    //   setTotalPages(res.data.totalPages);
    //   setQuestions(res.data.questions);
    //   setLoading(false);
    // }
  }
  return (
    <div className="px-7 mb-7 sm:p-0">
      {/* text and button */}
      <div className="flex justify-between mt-5 ">
        <header>
          <Typography variant="h5">All Quesitons</Typography>
        </header>

        <Link href={`${cookieLoggedInUser ? "/askquestion" : "/login"}`}>
          <Button variant="contained" disableElevation>
            Ask Question
          </Button>
        </Link>
      </div>

      {/* count and options */}
      <div className="flex justify-between items-center mt-5 ">
        <Typography>213476 questions</Typography>
        <div className="buttons flex justify-between items-center  border border-gray-300 rounded-md p-1">
          <Button
            onClick={getNewQuestions}
            color="inherit"
            className={`p-1 mx-1 text-xs text-gray-500${
              filterMode == "newest" ? " bg-gray-200 " : ""
            }`}
          >
            Newest
          </Button>

          <Button
            onClick={getUnansweredQuestions}
            color="inherit"
            className={`p-1 px-2 mx-1 text-xs text-gray-500${
              filterMode == "unanswered" ? " bg-gray-200 " : ""
            }`}
          >
            Unanswered
          </Button>
        </div>
      </div>
      <Divider className="mt-4" />
    </div>
  );
};

export default HeaderQuestionBar;
