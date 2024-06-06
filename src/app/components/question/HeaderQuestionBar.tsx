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
  questionsFound,
}: any) => {
  const cookieLoggedInUser = useSelector((state: any) => state.loggedInUser);
  console.log("header rendered", filterMode);

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
        <Typography>{questionsFound} questions</Typography>
        <div className="buttons flex justify-between items-center  border border-gray-300 rounded-md p-1">
          <button
            onClick={getNewQuestions}
            className={`py-1 px-1.5 mr-1 text-xs text-gray-500 rounded  ${
              filterMode == "newest" ? " bg-gray-200 " : ""
            }`}
          >
            Newest
          </button>

          <button
            onClick={getUnansweredQuestions}
            className={`py-1 px-1.5  text-xs text-gray-500 rounded  ${
              filterMode == "unanswered" ? " bg-gray-200 " : ""
            }`}
          >
            Unanswered
          </button>
        </div>
      </div>
      <Divider className="mt-4" />
    </div>
  );
};

export default HeaderQuestionBar;
