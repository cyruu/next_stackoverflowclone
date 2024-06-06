"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import LeftSideBar from "../components/LeftSideBar";
import QuestionBar from "../components/QuestionBar";
import RightSideBar from "../components/RightSideBar";
const Search = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const searchTerm = urlParams.get("q");

  return (
    <Grid container>
      <Grid item sm={2} className="hidden sm:flex">
        <LeftSideBar />
      </Grid>
      <Grid item xs={12} sm={7} className="">
        <QuestionBar searchTerm={searchTerm} />
      </Grid>
      <Grid item sm={3} className="hidden sm:flex">
        <RightSideBar />
      </Grid>
    </Grid>
  );
};

export default Search;
