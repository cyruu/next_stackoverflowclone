"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import queryLogo from "@/images/querylogo.png";
import Dropdown from "./Dropdown";
import { usePathname } from "next/navigation";
// components from material ui
import {
  ListItem,
  ListItemText,
  List,
  Avatar,
  Typography,
} from "@mui/material";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getCookieUser } from "../slices/appSlice";
const Navbar = () => {
  const dis = useDispatch<ThunkDispatch<any, any, any>>();
  const loggedInUser = useSelector((state: any) => state.loggedInUser);
  // console.log("check", loggedInUser);

  const getUser = async () => {
    try {
      const res = await axios.get("api/users/getuser");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // getUser();
    dis(getCookieUser());
  }, []);
  return (
    <nav className="h-20 flex items-center justify-between px-5 sm:px-[10%]">
      <Dropdown />
      <Link href="/">
        <Image src={queryLogo} className="w-24 sm:w-32" alt={""} />
      </Link>
      <div className="searchBar flex-1 flex justify-center hidden whitespace-nowrap sm:flex">
        <form className="w-[60%] border border-gray-300 rounded-md py-1 px-1">
          <SearchIcon className="mx-1" />
          <input type="text" className="outline-none w-[80%]" />
        </form>
      </div>
      {loggedInUser ? (
        <div>
          <List className=" p-0">
            <ListItem className="p-0">
              <Avatar className="bg-blue-600  mr-1 sm:mr-2 w-8 h-8 text-sm">
                {loggedInUser.username[0].toUpperCase()}
              </Avatar>
              <ListItemText
                primary={
                  <>
                    <Typography className="text-md">
                      {loggedInUser.username}
                    </Typography>
                  </>
                }
                sx={{ fontSize: "20px" }}
              />
            </ListItem>
          </List>
        </div>
      ) : (
        <div className="buttons hidden sm:block">
          <Button variant="outlined" className="ml-2" size="small">
            <Link href="/login">Login</Link>
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="ml-2 "
            disableElevation
            size="small"
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
