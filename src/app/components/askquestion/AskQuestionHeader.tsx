"use client";
import { Paper, Typography, List, ListItem } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React from "react";

const AskQuestionHeader = () => {
  return (
    <div className=" w-full">
      <Typography variant="h5" className="font-bold">
        Ask a question
      </Typography>
      {/* description */}
      <div className="description mt-5">
        <Paper
          className="bg-blue-50 p-2 border border-blue-300 sm:p-4 "
          elevation={0}
        >
          <Typography variant="body1" className="mb-2 font-bold">
            Writing a good question
          </Typography>
          <Typography variant="body2">
            You’re ready to ask a programming-related question and this form
            will help guide you through the process.
          </Typography>
          <div className="steps mt-4">
            <Typography variant="body2" className="font-bold mb-2">
              Steps
            </Typography>
            <List className="p-0 ml-5">
              <ListItem className="p-0 flex items-center ">
                <Typography variant="body2" className="flex ">
                  <FiberManualRecordIcon className="text-xs mr-2 mt-1" />
                  Summarize your problem in a one-line title.
                </Typography>
              </ListItem>
              <ListItem className="p-0 flex items-center ">
                <Typography variant="body2" className="flex ">
                  <FiberManualRecordIcon className="text-xs mr-2 mt-1" />
                  Describe your problem in more detail.
                </Typography>
              </ListItem>
              <ListItem className="p-0 flex items-center ">
                <Typography variant="body2" className="flex ">
                  <FiberManualRecordIcon className="text-xs mr-2 mt-1" />
                  Describe what you tried and what you expected to happen.
                </Typography>
              </ListItem>
              <ListItem className="p-0 flex items-center ">
                <Typography variant="body2" className="flex ">
                  <FiberManualRecordIcon className="text-xs mr-2 mt-1" />
                  Review your question and post it to the site.
                </Typography>
              </ListItem>
            </List>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default AskQuestionHeader;
