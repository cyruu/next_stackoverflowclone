"use client";
import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
//react toast notification
const notify = (errmsg: String, statusCode: Number) =>
  toast(errmsg, {
    position: "top-center",
    autoClose: statusCode == 200 ? false : 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: statusCode == 200 ? "success" : "error",
    theme: "colored",
  });
const VerifyToken = ({ params }: any) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { verifytoken } = params;
  const handleVerification = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/verifyuser", {
        verifyToken: verifytoken,
      });
      notify(res.data.msg, res.data.statusCode);
      if (res.data.statusCode == 200) {
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
      setLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="h-[89vh] flex items-center justify-center flex-col">
        <ToastContainer />
        <Typography variant="h4" className="">
          Thank you for loggin in to Query.
        </Typography>
        <Typography variant="body1" className="my-6">
          Confim the email verification to Query by clicking on button below.
        </Typography>
        {loading ? (
          <LoadingButton
            size="medium"
            color="error"
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <span className="mr-6">Confirm Verification</span>
          </LoadingButton>
        ) : (
          <Button
            variant="contained"
            color="success"
            disableElevation
            onClick={handleVerification}
          >
            Confirm verification
          </Button>
        )}
      </div>
    </>
  );
};

export default VerifyToken;
