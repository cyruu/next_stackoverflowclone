"use client";
import React from "react";
import Image from "next/image";
import queryLogo from "@/images/querylogo.png";
import Dropdown from "./Dropdown";
// components from material ui
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="h-20 flex items-center justify-between px-[10%]">
      <Dropdown />
      <Link href="/">
        <Image src={queryLogo} className="w-32" alt={""} />
      </Link>
      <div className="searchBar flex-1 flex justify-center hidden whitespace-nowrap sm:flex">
        <form
          action=""
          className="w-[60%] border border-gray-300 rounded-md py-1 px-1  "
        >
          <SearchIcon className="mx-1" />
          <input type="text" className="outline-none w-[80%]" />
        </form>
      </div>
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
    </nav>
  );
};

export default Navbar;
