"use client";
import React from "react";
import { useSelector } from "react-redux";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import QuestionBar from "../components/QuestionBar";

import { Grid } from "@mui/material";

const Questions = () => {
  const loggedInUser = useSelector((state: any) => state.loggedInUser);

  return (
    // <div className="questions grid">
    <Grid container>
      <Grid item sm={2} className="hidden sm:flex">
        <LeftSideBar />
      </Grid>
      <Grid item xs={12} sm={7} className="">
        <QuestionBar />
      </Grid>
      <Grid item sm={3} className="hidden sm:flex">
        <RightSideBar />
      </Grid>
    </Grid>
    // </div>
  );
};

export default Questions;
