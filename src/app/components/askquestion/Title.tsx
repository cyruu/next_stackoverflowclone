"use client";

import { Paper, Typography } from "@mui/material";
import React, { ReactElement } from "react";

const Title = ({
  register,
  registerName,
  errors,
  className,

  ...props
}: any) => {
  if (errors.title) {
    className += " outline-red-600 border-red-600";
  }

  return (
    <Paper className="p-2 my-8 border border-gray-300 sm:p-5" elevation={0}>
      <Typography variant="body1" className="font-bold">
        Title
      </Typography>
      <Typography className="font-light text-xs mt-1">
        Be specific and imagine you’re asking a question to another person.
      </Typography>
      <input
        {...props}
        // className="text-xs p-2 rounded-md outline-blue-400 w-full my-3 border broder-gray-500"
        className={className}
        {...register(registerName, {
          required: {
            value: true,
            message: "Title is required",
          },
          minLength: {
            value: 1,
            message: "Title must be at least 15 characters.",
          },
        })}
      />
      {errors.title ? (
        <p className="text-xs mt-1 text-red-600">{errors.title.message}</p>
      ) : (
        ""
      )}
    </Paper>
  );
};

export default Title;
