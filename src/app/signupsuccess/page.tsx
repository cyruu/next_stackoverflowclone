import { Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const SignupSuccess = () => {
  return (
    <div className="flex h-[89vh] items-center flex-col justify-center">
      <Typography
        sx={{ fontWeight: "bold" }}
        className="text-[2.1rem] text-center"
      >
        Thank You for Signing Up.{" "}
      </Typography>
      <Typography className="px-5 text-center text-[.9rem] my-4">
        A verification email has been sent to your email account. Please check
        inbox to verify.{" "}
      </Typography>
      <Link href="/login">
        <Button variant="contained" color="success">
          Login
        </Button>
      </Link>
    </div>
  );
};

export default SignupSuccess;
