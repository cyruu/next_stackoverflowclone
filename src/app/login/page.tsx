"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Button, TextField, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { notify } from "@/app/helpers/notify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UseSelector, useDispatch } from "react-redux";
import { setLoggedInUser } from "../slices/appSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

type formValues = {
  email: String;
  password: String;
};

const Login = () => {
  const dis = useDispatch<ThunkDispatch<any, any, any>>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm<formValues>();
  const { errors } = formState;
  const submit = async (data: formValues) => {
    setLoading(true);
    const res = await axios.post("/api/users/login", data);
    if (res.data.statusCode == 200) {
      notify(res.data.msg, res.data.statusCode);
      setTimeout(() => {
        router.push("/questions");
      }, 1000);
    } else {
      notify("Invalid Credentials! Try Verifying your email.", 404);
    }
    setLoading(false);
  };
  async function getLoggedInUser() {
    try {
      const res = await axios.get("api/users/getLoggedInUser");
      const user = res.data.loggedInUser;
      // setCookieLoggedInUser(user);
      // dis(setLoggedInUser({ loggedInUser: user }));
      if (user) {
        router.push("/questions");
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <div className="h-[89vh] flex items-center justify-center">
      <ToastContainer />
      <form
        onSubmit={handleSubmit(submit)}
        className="w-3/4 flex flex-col items-center sm:w-96"
        method="post"
      >
        <Typography variant="h3" className="mb-8">
          Login
        </Typography>

        <TextField
          // autoComplete="off"
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
          className="w-full mt-6"
        />
        <p className="mr-auto text-xs m-0 text-red-700 mt-1">
          {errors.email?.message}
        </p>
        <TextField
          // autoComplete="off"
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
            size="large"
            color="error"
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <span className="mr-6">Login</span>
          </LoadingButton>
        ) : (
          <Button variant="contained" size="large" type="submit">
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

// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { useForm } from "react-hook-form";
// import { LoadingButton } from "@mui/lab";
// import { Button, TextField, Typography } from "@mui/material";
// import { ToastContainer } from "react-toastify";
// import { notify } from "@/app/helpers/notify";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { UseSelector, useDispatch } from "react-redux";
// import { setLoggedInUser } from "../slices/appSlice";
// type formValues = {
//   email: String;
//   password: String;
// };

// const Login = () => {
//   const dis = useDispatch();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const { register, handleSubmit, formState } = useForm<formValues>();
//   const { errors } = formState;
//   const submit = async (data: formValues) => {
//     setLoading(true);
//     const res = await axios.post("/api/users/login", data);

//     console.log(res.data.msg);
//     notify(res.data.msg, res.data.statusCode);
//     setLoading(false);
//     if (res.data.statusCode == 200) {
//       console.log("setting redux data when login manually");

//       setTimeout(() => {
//         dis(setLoggedInUser({ loggedInUser: res.data.loggedInUser }));
//         router.push("/questions");
//       }, 1500);
//     }
//   };
//   return (
//     <div className="h-[89vh] flex items-center justify-center">
//       <ToastContainer />
//       <form
//         onSubmit={handleSubmit(submit)}
//         className="w-3/4 flex flex-col items-center sm:w-96"
//       >
//         <Typography variant="h3" className="mb-8">
//           Login
//         </Typography>

//         <TextField
//           // autoComplete="off"
//           {...register("email", {
//             required: {
//               value: true,
//               message: "Enter email.",
//             },
//             pattern: {
//               value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//               message: "Invalid Email.",
//             },
//           })}
//           color={errors.email ? "error" : "primary"}
//           id="standard-basic"
//           label="Email"
//           variant="standard"
//           className="w-full mt-6"
//         />
//         <p className="mr-auto text-xs m-0 text-red-700 mt-1">
//           {errors.email?.message}
//         </p>
//         <TextField
//           // autoComplete="off"
//           {...register("password", {
//             pattern: {
//               value: /^[a-zA-Z0-9@]{8,}$/,
//               message: "Must contain at least 8 characters",
//             },
//             required: {
//               value: true,
//               message: "Enter password",
//             },
//           })}
//           color={errors.password ? "error" : "primary"}
//           id="standard-basic"
//           label="Password"
//           variant="standard"
//           className="w-full mt-8"
//         />
//         <p className="mr-auto text-xs m-0 text-red-700 mt-1 mb-8">
//           {errors.password?.message}
//         </p>
//         {loading ? (
//           <LoadingButton
//             size="large"
//             color="error"
//             loading={loading}
//             loadingPosition="end"
//             variant="contained"
//           >
//             <span className="mr-6">Login</span>
//           </LoadingButton>
//         ) : (
//           <Button variant="contained" size="large" type="submit">
//             Login
//           </Button>
//         )}
//         <Link href="/signup" className="mt-4 block underline">
//           New here? Create account.
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default Login;
