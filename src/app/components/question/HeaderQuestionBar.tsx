"use client";
import { Button, Typography, Divider } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
const HeaderQuestionBar = () => {
  const cookieLoggedInUser = useSelector((state: any) => state.loggedInUser);

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
          <Button color="inherit" className="p-1 mx-1 text-xs text-gray-500">
            Newest
          </Button>
          <Button color="inherit" className="p-1 mx-1 text-xs text-gray-500">
            Unanswered
          </Button>
        </div>
      </div>
      <Divider className="mt-4" />
    </div>
  );
};

export default HeaderQuestionBar;
