"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button, TextField, Typography } from "@mui/material";
type formValues = {
  username: String;
  email: String;
  password: String;
};

const Signup = () => {
  const { register, handleSubmit, formState } = useForm<formValues>();
  const { errors } = formState;
  const submit = (data: formValues) => {
    console.log(data);
  };
  return (
    <div className="h-[89vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit(submit)}
        className="w-72 flex flex-col items-center"
      >
        <Typography variant="h3" className="mb-8">
          Sign Up
        </Typography>
        <TextField
          {...register("username")}
          id="standard-basic"
          label="Username"
          variant="standard"
          className="w-full mb-4"
        />
        <TextField
          {...register("email")}
          id="standard-basic"
          label="Email"
          variant="standard"
          className="w-full mb-4"
        />
        <TextField
          {...register("password")}
          id="standard-basic"
          label="Password"
          variant="standard"
          className="w-full mb-8"
        />
        <Button variant="contained" type="submit">
          Sign Up
        </Button>

        <Link href="/login" className="mt-2 block sm:hidden">
          Already have account?
        </Link>
      </form>
    </div>
  );
};

export default Signup;
