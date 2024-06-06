"use client";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import React from "react";
import QuizIcon from "@mui/icons-material/Quiz";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Link from "next/link";
const LeftSideBar = () => {
  return (
    <div className=" h-[89vh] flex justify-end fixed top-20 sm:w-36 lg:w-52">
      <List className="mt-5">
        <Link href="/">
          <ListItem className="w-40 hover:bg-gray-100 sm:pl-10 lg:pl-7 ">
            <HomeIcon className="mr-2" />
            <Typography variant="body2">Home</Typography>
          </ListItem>
        </Link>
        <Link href="/questions">
          <ListItem className=" w-40 hover:bg-gray-100 sm:pl-10 lg:pl-7 ">
            <QuizIcon className="mr-2" />
            <Typography variant="body2">Questions</Typography>
          </ListItem>
        </Link>
        <Link href="/saves">
          <ListItem className=" w-40 hover:bg-gray-100 sm:pl-10 lg:pl-7 mt-10 ">
            <BookmarkIcon className="mr-2" />
            <Typography variant="body2">Saves</Typography>
          </ListItem>
        </Link>
      </List>
      <Divider orientation="vertical" />
    </div>
  );
};

export default LeftSideBar;
