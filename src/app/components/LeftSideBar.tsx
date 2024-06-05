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
    <div className="w-56 h-[89vh] flex justify-end fixed top-20 ">
      <List>
        <ListItem className=" w-40">
          <HomeIcon className="mr-2" />
          <Typography variant="body2">Home</Typography>
        </ListItem>
        <ListItem className=" w-40">
          <QuizIcon className="mr-2" />
          <Typography variant="body2">Questions</Typography>
        </ListItem>
        <ListItem className=" w-40">
          <BookmarkIcon className="mr-2" />
          <Typography variant="body2">Saves</Typography>
        </ListItem>
      </List>
      <Divider orientation="vertical" />
    </div>
  );
};

export default LeftSideBar;
