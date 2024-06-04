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
import { getCookieUser, setLoggedInUser } from "../slices/appSlice";

const Navbar = () => {
  const path = usePathname();
  const dis = useDispatch<ThunkDispatch<any, any, any>>();
  // const [cookieLoggedInUser, setCookieLoggedInUser] = useState({});
  const cookieLoggedInUser = useSelector((state: any) => state.loggedInUser);
  // console.log("check", loggedInUser);

  // const getUser = async () => {
  //   try {
  //     const cookieRes = await axios.get("api/users/getuser");
  //     if (cookieRes.data.statusCode == 200) {
  //       // console.log(
  //       //   "user exists , response jwtdata",
  //       //   cookieRes.data.jwtTokenData
  //       // );
  //       dis(setLoggedInUser({ loggedInUser: cookieRes.data.jwtTokenData }));
  //     } else {
  //       dis(setLoggedInUser({ loggedInUser: null }));
  //       console.log("no user", cookieRes.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  async function getLoggedInUser() {
    try {
      const res = await axios.get("api/users/getLoggedInUser");
      const user = res.data.loggedInUser;
      // setCookieLoggedInUser(user);
      dis(setLoggedInUser({ loggedInUser: user }));
    } catch (error: any) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log("navbar mount, checking for cookie");
    getLoggedInUser();

    // getUser();
    // yo async thunk dispatch garda refresh garda loggedInUser false in thyo
    // dis(getCookieUser());
  }, [path]);
  return (
    <nav className="h-20 flex items-center justify-between pr-5 sm:px-[10%]">
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
      {cookieLoggedInUser ? (
        <div>
          <List className=" p-0">
            <ListItem className="p-0">
              <Avatar className="bg-blue-600  mr-1 sm:mr-2 w-8 h-8 text-sm">
                c
              </Avatar>
              <ListItemText
                primary={
                  <>
                    <Typography className="text-md">tempusername</Typography>
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
