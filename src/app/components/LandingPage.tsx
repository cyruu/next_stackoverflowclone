"use client";
import React, { useEffect } from "react";
import landing from "@/images/landing.jpg";
import Image from "next/image";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import axios from "axios";
const LandingPage = () => {
  async function testing() {
    const res = await axios.get("/api/testing");
    console.log("testing front end", res);
  }
  useEffect(() => {
    testing();
  }, []);
  //test
  return (
    <div className="h-[89vh] relative flex flex-col items-center justify-around sm:flex-row">
      <Image src={landing} alt="" className="w-full sm:w-1/2  " />
      <div className="typos mt-0 mb-16  flex flex-col items-center sm:mr-80 mb-0 mt-16">
        <Typography variant="h3" className="text-center mb-5 flex-1 ">
          I&apos;m Query.
        </Typography>

        <Typography variant="h5" className="text-center mb-5 flex-1 ">
          What&apos;s your Question?
        </Typography>
        <Link href="/questions">
          <Button
            variant="contained"
            color="primary"
            size="large"
            disableElevation
          >
            Find Answers
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
