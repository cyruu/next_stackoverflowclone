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
const LeftSideBar = () => {
  return (
    <div className=" h-[89vh] flex justify-end fixed top-20 sm:w-36 lg:w-52">
      <List className="mt-5">
        <ListItem className="w-40 sm:pl-10 lg:pl-7 ">
          <HomeIcon className="mr-2" />
          <Typography variant="body2">Home</Typography>
        </ListItem>
        <ListItem className=" w-40 sm:pl-10 lg:pl-7 ">
          <QuizIcon className="mr-2" />
          <Typography variant="body2">Questions</Typography>
        </ListItem>
        <ListItem className=" w-40 sm:pl-10 lg:pl-7 mt-10 ">
          <BookmarkIcon className="mr-2" />
          <Typography variant="body2">Saves</Typography>
        </ListItem>
      </List>
      <Divider orientation="vertical" />
    </div>
  );
};

export default LeftSideBar;
