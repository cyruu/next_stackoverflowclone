"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
type formValues = {
  email: String;
  password: String;
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm<formValues>();
  const { errors } = formState;
  const submit = async (data: formValues) => {
    setLoading(true);
    const res = await axios.post("/api/users/signup", data);
    console.log(res.data.msg);

    setLoading(false);
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
          {...register("email", {
            required: {
              value: true,
              message: "Enter email.",
            },
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Invalid Email.",
            },
          })}
          color={errors.email ? "error" : "primary"}
          id="standard-basic"
          label="Email"
          variant="standard"
          className="w-full mt-4"
        />
        <p className="mr-auto text-xs m-0 text-red-700 mt-1">
          {errors.email?.message}
        </p>
        <TextField
          {...register("password", {
            pattern: {
              value: /^[a-zA-Z0-9@]{8,}$/,
              message: "Must contain at least 8 characters",
            },
            required: {
              value: true,
              message: "Enter password",
            },
          })}
          color={errors.password ? "error" : "primary"}
          id="standard-basic"
          label="Password"
          variant="standard"
          className="w-full mt-8"
        />
        <p className="mr-auto text-xs m-0 text-red-700 mt-1 mb-8">
          {errors.password?.message}
        </p>
        {loading ? (
          <LoadingButton
            size="medium"
            color="error"
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <span className="mr-6">Login</span>
          </LoadingButton>
        ) : (
          <Button variant="contained" type="submit">
            Login
          </Button>
        )}
        <Link href="/signup" className="mt-4 block underline">
          New here? Create account.
        </Link>
      </form>
    </div>
  );
};

export default Login;
