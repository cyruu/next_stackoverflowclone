"use client";
import { Paper, Typography } from "@mui/material";

import React, { useRef, useState } from "react";

const Details = ({
  register,
  registerName,
  errors,
  className,
  ...props
}: any) => {
  if (errors.details) {
    className += " outline-red-600 border-red-600";
  }

  return (
    <Paper className="p-2 my-8 border border-gray-300 sm:p-5" elevation={0}>
      <Typography variant="body1" className="font-bold">
        What are the details of your problem?
      </Typography>
      <Typography className="font-light text-xs mt-1">
        Introduce the problem and expand on what you put in the title. Minimum
        20 characters.
      </Typography>
      <textarea
        {...props}
        // className="text-xs p-2 rounded-md outline-blue-400 w-full my-3 border broder-gray-500"
        className={className}
        {...register(registerName, {
          required: {
            value: true,
            message: "Details is required",
          },
          minLength: {
            value: 1,
            message: "Details must be at least 20 characters.",
          },
        })}
      ></textarea>
      {errors.details ? (
        <p className="text-xs mt-1 text-red-600">{errors.details.message}</p>
      ) : (
        ""
      )}
    </Paper>
  );
};

export default Details;
