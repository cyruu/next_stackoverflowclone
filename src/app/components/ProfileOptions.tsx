import { List, ListItem, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import Person4Icon from "@mui/icons-material/Person4";
import axios from "axios";
import { useRouter } from "next/navigation";

import { notify } from "@/app/helpers/notify";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
const ProfileOptions = () => {
  const router = useRouter();

  const dis = useDispatch<ThunkDispatch<any, any, any>>();
  //logout
  async function handleLogout() {
    try {
      const res = await axios.get("/api/users/logout");
      console.log("logout res", res);
      if (res.data.statusCode == 200) {
        console.log("go to login");

        router.push("/login");
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <div className="absolute top-16 left-[-20px] z-10 border border-gray-200 w-36">
      <ToastContainer />
      <Paper>
        <List className="  m-0 p-0">
          <Link href="/profile">
            <ListItem className="p-2 hover:bg-gray-100">
              <Person4Icon className="mx-2" />
              <Typography sx={{ fontSize: "..9rem" }}>Profile</Typography>
            </ListItem>
          </Link>
          <button
            className="cursor-pointer w-full p-0 hover:bg-gray-100"
            onClick={handleLogout}
          >
            <ListItem className="p-2">
              <LogoutIcon className="mx-2" />
              <Typography sx={{ fontSize: "..9rem" }}>Logout</Typography>
            </ListItem>
          </button>
        </List>
      </Paper>
    </div>
  );
};

export default ProfileOptions;
