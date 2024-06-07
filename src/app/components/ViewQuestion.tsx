import { Divider, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import React from "react";

const ViewQuestion = () => {
  return (
    <div className="px-7 ml-0 mt-5 sm:p-0 sm:ml-7 sm:mt-7">
      <div className="header">
        <div className="title">
          <Typography variant="h5">What is react lorem50</Typography>
        </div>
        <div className="info mt-2 mb-3">
          <Typography className="text-gray-400 text-xs">Asked today</Typography>
        </div>
        <Divider />
      </div>
      <div className="content mt-5 flex">
        <div className="votes pr-3 sm:pr-5 ">
          <div className="voteitems flex flex-col items-center">
            <button className="voteicon border border-gray-300 p-1 rounded-full">
              <PlayArrowIcon className="rotate-[-90deg]" />
            </button>
            <Typography variant="h6" className="my-1">
              1
            </Typography>
            <button className="voteicon border border-gray-300 p-1 rounded-full">
              <PlayArrowIcon className="rotate-90" />
            </button>
            <button className="saveicons">
              <BookmarkBorderIcon className="text-gray-400 mt-3" />
            </button>
          </div>
        </div>
        <div className="info">
          <div className="details">
            <Typography className="text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit tenetur assumenda molestias natus nam deleniti porro
              iste sint voluptate voluptatum minima ratione ad commodi quam
              eligendi ullam molestiae, obcaecati odio. Est alias incidunt
              maxime non maiores? Velit, autem ipsa!
            </Typography>
            <Typography className="text-sm mb-4">
              luptatum minima ratione ad commodi quam eligendi ullam molestiae,
              obcaecati odio. Est alias incidunt maxime non maiores? Velit,
              autem ipsa!
            </Typography>
          </div>
          <div className="info-footer flex flex-col items-end mt-7">
            <div className="user bg-blue-50 py-1.5 px-2 w-32 rounded-md">
              <Typography className="text-xs mb-1 text-gray-500">
                asked today
              </Typography>
              <div className="userinfo flex items-center">
                <div className="userpic mr-1 h-[25px] w-[25px] bg-blue-500 rounded-md flex items-center justify-center text-white ">
                  <Typography className="text-sm">C</Typography>
                </div>
                <Typography className="text-xs text-blue-600">Cyrus</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="answers"></div>
    </div>
  );
};

export default ViewQuestion;
