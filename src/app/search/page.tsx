"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import LeftSideBar from "@/app/components/LeftSideBar";
import RightSideBar from "@/app/components/RightSideBar";
import QuestionBar from "@/app/components/QuestionBar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchTerm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const searchQuery = useSearchParams();

    const search = String(searchQuery);
    const realSearchTerm = search.split("=")[1];
    setSearchTerm(searchTerm);
  }, []);

  return (
    <>
      {/* <h1>{searchTerm}</h1> */}
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
    </>
  );
};

export default SearchTerm;
