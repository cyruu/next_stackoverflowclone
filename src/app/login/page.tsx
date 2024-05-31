"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
type formValues = {
  email: String;
  password: String;
};

const Login = () => {
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
          Login
        </Typography>

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
          Login
        </Button>
        <Link href="/signup" className="mt-2 block sm:hidden">
          New here? Create account.
        </Link>
      </form>
    </div>
  );
};

export default Login;
