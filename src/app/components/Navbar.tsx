"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import queryLogo from "@/images/querylogo.png";
import Dropdown from "./Dropdown";
import { usePathname } from "next/navigation";
import ProfileOptions from "./ProfileOptions";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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
import { notify } from "@/app/helpers/notify";
import { ToastContainer } from "react-toastify";
import MoblieSearch from "./MoblieSearch";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const path = usePathname();
  const router = useRouter();
  const dis = useDispatch<ThunkDispatch<any, any, any>>();
  const [showBurger, setShowBurger] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
      const hostedDomain = process.env.HOSTED_DOMAIN;
      // const hostedDomain = "http://localhost:3000";
      axios.defaults.baseURL = hostedDomain;
      const res = await axios.get(`/api/users/getLoggedInUser`);
      // const res = await axios.get(
      //   `${process.env.HOSTED_DOMAIN}/api/users/getLoggedInUser`
      // );

      const user = res.data.loggedInUser;

      // setCookieLoggedInUser(user);
      dis(setLoggedInUser({ loggedInUser: user }));
    } catch (error: any) {
      console.log(error);
    }
  }
  // useEffect(() => {
  //   if (logoutStatus) {
  //     notify("mamba out", 200);
  //   }
  // }, [logoutStatus]);
  useEffect(() => {
    console.log("navbar mount, checking for cookie");

    // notify("mamba out", 200);
    getLoggedInUser();

    // getUser();
    // yo async thunk dispatch garda refresh garda loggedInUser false in thyo
    // dis(getCookieUser());
    if (
      (path == "/questions" || path.match(/^\/questions\/.*$/)) &&
      window.innerWidth > 640
    ) {
      setShowBurger(false);
    } else {
      setShowBurger(true);
    }
  }, [path]);
  return (
    <nav
      className="h-20 flex items-center justify-between pr-5 sticky top-0 bg-white z-20 sm:px-[10%] "
      style={{ borderBottom: "1px solid #E2DFD0" }}
    >
      <div className="flex items-center">
        <ToastContainer />
        {showBurger ? <Dropdown /> : ""}
        <Link href="/">
          <Image
            src={queryLogo}
            className="w-28 ml-14 sm:w-32"
            alt={""}
            priority={true}
          />
        </Link>
      </div>

      <div className="searchBar flex-1 flex justify-center hidden whitespace-nowrap sm:flex">
        <form
          className="w-[60%] border border-gray-300 rounded-md py-1 px-1"
          onSubmit={(e) => {
            e.preventDefault();

            // window.location.href = `/search?q=${searchTerm}`;
            router.push(`/search?q=${searchTerm}`);
          }}
        >
          <SearchIcon className="mx-1" />
          <input
            type="text"
            className="outline-none w-[80%] text-sm text-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
      {cookieLoggedInUser ? (
        <div className="relative">
          <button
            className=" p-0 mr-2"
            onFocus={() => {
              setShowProfileOptions(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setShowProfileOptions(false);
              }, 100);
            }}
          >
            <List>
              <ListItem className="p-0">
                <div className="bg-blue-600 flex justify-center items-center mr-1.5 text-white h-[28px] w-[28px] rounded-full text-lg pb-1 sm:h-[30px] w-[30px] text-sm   ">
                  {cookieLoggedInUser.username[0].toUpperCase()}
                </div>
                <ListItemText
                  primary={
                    <>
                      <Typography className="text-md">
                        {cookieLoggedInUser.username}
                      </Typography>
                    </>
                  }
                  sx={{ fontSize: "20px" }}
                />
                <ArrowDropDownIcon className="text-lg ml-1" />
              </ListItem>
            </List>
          </button>
          <div className={`options ${showProfileOptions ? "" : "hidden"}`}>
            <ProfileOptions />
          </div>
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
      <div className="sm:hidden">
        <MoblieSearch />
      </div>
    </nav>
  );
};

export default Navbar;
