"use client";
import { Button, Typography, Divider, Skeleton } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SkeletonComponent from "../SkeletonComponent";
const HeaderQuestionBar = ({
  setTotalPages,
  setQuestions,
  loading,
  searchTerm,
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
  }
  function getUnansweredQuestions() {
    setFilterMode("unanswered");
    setPage(1);
  }
  return (
    <div className="px-7 mb-7 sm:p-0 sm:mb-10">
      {/* text and button */}
      <div className="flex justify-between sm:mt-5 ">
        <header>
          <Typography variant="h5">All Quesitons</Typography>
        </header>

        <Link href={`${cookieLoggedInUser ? "/askquestion" : "/login"}`}>
          <Button variant="contained" disableElevation>
            Ask Question
          </Button>
        </Link>
      </div>
      {searchTerm ? (
        <div className="search text-xs mt-2 w-full flex flex-wrap">
          Search for &quot;{searchTerm}&quot;.
        </div>
      ) : (
        ""
      )}

      {/* count and options */}
      <div className="flex justify-between items-center mt-5 mb-3 ">
        {loading ? (
          <Skeleton className="w-24" />
        ) : (
          <Typography>{questionsFound} questions</Typography>
        )}
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
      <Divider className="" />
    </div>
  );
};

export default HeaderQuestionBar;
