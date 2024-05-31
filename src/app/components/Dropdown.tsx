"use client";
import React, { useState } from "react";
import List from "@mui/material/List";

import { ListItemText, ListItem } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Link from "next/link";
const Dropdown = () => {
  const [showDropdown, setShowdropdown] = useState(false);

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
        <List className="w-44 absolute top-20 bg-white p-0" component="nav">
          <Link href="questions">
            <ListItem className="p-0">
              {/* <ListItemIcon > */}
              <QuizIcon className="p-0 w-max mx-2" />
              {/* </ListItemIcon> */}
              <ListItemText primary="Questions" />
            </ListItem>
          </Link>
          <Link href="/login">
            <ListItem className="p-0">
              {/* <ListItemIcon > */}
              <LoginIcon className="p-0 w-max mx-2" />
              {/* </ListItemIcon> */}
              <ListItemText primary="Login" />
            </ListItem>
          </Link>
          <Link href="/signup">
            <ListItem className="p-0">
              {/* <ListItemIcon > */}
              <AddBoxOutlinedIcon className="p-0 w-max mx-2" />
              {/* </ListItemIcon> */}
              <ListItemText primary="Sign Up" />
            </ListItem>
          </Link>
        </List>
      ) : (
        ""
      )}
    </>
  );
};

export default Dropdown;
