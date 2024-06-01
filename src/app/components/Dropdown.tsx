"use client";
import React, { useState } from "react";
import List from "@mui/material/List";
import { ListItemText, ListItem } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedInUser } from "../slices/appSlice";
const Dropdown = () => {
  const dis = useDispatch();
  const router = useRouter();
  const [showDropdown, setShowdropdown] = useState(false);
  const loggedInUser = useSelector((state: any) => state.loggedInUser);
  //logout
  async function handleLogout() {
    try {
      console.log("mamba out");
      const res = await axios.get("/api/users/logout");
      if (res.data.statusCode == 200) {
        router.push("/login");
      }

      dis(setLoggedInUser({ loggedInUser: null }));
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <>
      {/* <div className="dropdownLinks absolute top-20 bg-white w-44"> */}
      <button
        onFocus={() => {
          setShowdropdown(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setShowdropdown(false);
          }, 100);
        }}
      >
        <MenuIcon className="mr-4 cursor-pointer" />
      </button>
      {showDropdown ? (
        <List
          className="w-44 absolute top-20 bg-gray-600 p-0 text-white z-10"
          component="nav"
        >
          <Link href="questions">
            <ListItem className="p-2 hover:bg-gray-500">
              {/* <ListItemIcon > */}
              <QuizIcon className="p-0 w-max mx-2" />
              {/* </ListItemIcon> */}
              <ListItemText primary="Questions" />
            </ListItem>
          </Link>
          {loggedInUser ? (
            <button
              className="cursor-pointer w-full p-0 hover:bg-gray-500"
              onClick={handleLogout}
            >
              <ListItem className="p-2">
                {/* <ListItemIcon > */}
                <LogoutIcon className="p-0 w-max mx-2" />
                {/* </ListItemIcon> */}
                <ListItemText primary="Logout" />
              </ListItem>
            </button>
          ) : (
            <>
              <Link href="/login">
                <ListItem className="p-2 hover:bg-gray-500">
                  {/* <ListItemIcon > */}
                  <LoginIcon className="p-0 w-max mx-2" />
                  {/* </ListItemIcon> */}
                  <ListItemText primary="Login" />
                </ListItem>
              </Link>
              <Link href="/signup">
                <ListItem className="p-2 hover:bg-gray-500">
                  {/* <ListItemIcon > */}
                  <AddBoxOutlinedIcon className="p-0 w-max mx-2" />
                  {/* </ListItemIcon> */}
                  <ListItemText primary="Sign Up" />
                </ListItem>
              </Link>
            </>
          )}
        </List>
      ) : (
        ""
      )}
    </>
  );
};

export default Dropdown;
