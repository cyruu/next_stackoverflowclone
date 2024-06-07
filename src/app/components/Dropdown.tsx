"use client";
import React, { useState } from "react";
import List from "@mui/material/List";
import { ListItemText, ListItem, Paper, Typography } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedInUser } from "../slices/appSlice";

const Dropdown = () => {
  const router = useRouter();
  const [showDropdown, setShowdropdown] = useState(false);
  const loggedInUser = useSelector((state: any) => state.loggedInUser);

  return (
    <div className="absolute">
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
        <MenuIcon className="mx-4 cursor-pointer" sx={{ fontSize: "1.8rem" }} />
      </button>
      {showDropdown ? (
        <List
          className="w-44 absolute top-14 p-0 border border-gray-200 z-10 "
          component="nav"
        >
          <Paper>
            <Link href="/">
              <ListItem className="p-1 hover:bg-gray-100">
                <HomeIcon className="p-0 w-max mx-2" />
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link href="questions">
              <ListItem className="p-1 hover:bg-gray-100">
                {/* <ListItemIcon > */}
                <QuizIcon className="p-0 w-max mx-2" />
                {/* </ListItemIcon> */}
                <ListItemText primary="Questions" />
              </ListItem>
            </Link>
            {/* <div className="mobileoptions sm:hidden"> */}

            <Link href="saves">
              <ListItem className="p-1 hover:bg-gray-100">
                <BookmarkIcon className="p-0 w-max mx-2" />
                <ListItemText primary="Saves" />
              </ListItem>
            </Link>
            {/* </div> */}

            {/*  login logout */}
            {loggedInUser ? (
              ""
            ) : (
              <>
                <Link href="/login">
                  <ListItem className="p-1 hover:bg-gray-100">
                    {/* <ListItemIcon > */}
                    <LoginIcon className="p-0 w-max mx-2" />
                    {/* </ListItemIcon> */}
                    <ListItemText primary="Login" />
                  </ListItem>
                </Link>
                <Link href="/signup">
                  <ListItem className="p-1 hover:bg-gray-100">
                    {/* <ListItemIcon > */}
                    <AddBoxOutlinedIcon className="p-0 w-max mx-2" />
                    {/* </ListItemIcon> */}
                    <ListItemText primary="Sign Up" />
                  </ListItem>
                </Link>
              </>
            )}
          </Paper>
        </List>
      ) : (
        ""
      )}
    </div>
  );
};

export default Dropdown;
