"use client";
import React from "react";
import landing from "@/images/landing.jpg";
import Image from "next/image";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
const LandingPage = () => {
  return (
    <div className="h-[89vh] relative flex flex-col items-center justify-center sm:flex-row">
      <Image src={landing} alt="" className="w-full sm:w-1/2 mr-18 " />
      <div className="typos mt-16 flex flex-col items-center sm:mt-0 ">
        <Typography variant="h3" className="text-center mb-5 flex-1 ">
          I'm Query.
        </Typography>

        <Typography variant="h5" className="text-center mb-5 flex-1 ">
          What's your Question?
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
