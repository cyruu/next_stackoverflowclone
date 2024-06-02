"use client";
import { Paper, Typography } from "@mui/material";
import React, { ReactElement } from "react";

const Expect = ({
  register,
  registerName,
  errors,
  className,
  ...props
}: any) => {
  if (errors.expect) {
    className += " outline-red-600 border-red-600";
  }
  return (
    <Paper className="p-2 my-8 border border-gray-300 sm:p-5" elevation={0}>
      <Typography variant="body1" className="font-bold">
        What did you try and what were you expecting?
      </Typography>
      <Typography className="font-light text-xs mt-1">
        Describe what you tried, what you expected to happen, and what actually
        resulted. Minimum 20 characters.
      </Typography>
      <textarea
        className={className}
        {...props}
        // className="text-xs p-2 rounded-md outline-blue-400 w-full my-3 border broder-gray-500"
        {...register(registerName, {
          required: {
            value: true,
            message: "Field required",
          },
          minLength: {
            value: 1,
            message: "Field must be at least 20 characters.",
          },
        })}
      ></textarea>
      {errors.expect ? (
        <p className="text-xs mt-1 text-red-600">{errors.expect.message}</p>
      ) : (
        ""
      )}
    </Paper>
  );
};

export default Expect;
