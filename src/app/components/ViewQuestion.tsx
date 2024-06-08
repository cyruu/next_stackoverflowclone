"use client";
import { Divider, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import React, { useEffect, useRef, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import ViewQuestionSkeleton from "./ViewQuestionSkeleton";
import Answers from "./askquestion/Answers";
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";
import axios from "axios";
const ViewQuestion = ({ questionId }: any) => {
  const [question, setQuestion] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [mainCode, setMainCode] = useState("");
  const codeRef = useRef<any>();
  useEffect(() => {
    if (!loading && question?.codeSnippets[0]?.codeMain) {
      setMainCode(codeRef.current.innerText);
    }
  }, [loading]);
  async function wait() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res("ok");
      }, 1000);
    });
  }
  async function getQuestionDetail() {
    try {
      console.log("getting questions");

      setLoading(true);
      // await wait();
      // const res = await axios.post(
      //   `http://localhost:3000/api/questions/getquestiondetail`,
      //   { questionId }
      // );
      const res = await axios.get(
        `${process.env.HOSTED_DOMAIN}/api/questions/getquestiondetail`
      );

      if (res.data.statusCode == 200) {
        setQuestion(res.data.question);
        setLoading(false);
      }
      setLoading(false);
      console.log("view question response", res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getQuestionDetail();
  }, []);
  if (loading) {
    return <ViewQuestionSkeleton />;
  }
  return (
    <div className="px-7 ml-0 mt-5 sm:p-0 sm:ml-7 sm:mt-7">
      <div className="header">
        <div className="title">
          <Typography className="text-[1.6rem] sm:text-[2rem]">
            {question?.title}
          </Typography>
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
        <div className="info w-[85%] sm:w-full">
          <div className="details">
            <Typography className="text-sm mb-4 sm:text-md">
              {question?.details}
            </Typography>

            {/* codesnippets */}
            {question?.codeSnippets.length > 0 ? (
              <div className="codesnippet">
                <div
                  dangerouslySetInnerHTML={{
                    __html: question?.codeSnippets[0].codeMain,
                  }}
                  ref={codeRef}
                  className="hidden"
                ></div>
                <div className="codesnippetdetail">
                  <Typography className="text-sm mb-4 sm:text-md">
                    {question?.expect}
                  </Typography>
                </div>
                <div className="codesnippetcode mb-4">
                  <SyntaxHighlighter
                    language="javascript"
                    style={nord}
                    className="w-[255px] text-xs max-h-72 rounded-lg sm:w-full"
                  >
                    {mainCode}
                  </SyntaxHighlighter>
                </div>
              </div>
            ) : (
              ""
            )}
            <Typography className="text-sm mb-4 sm:text-md">
              {question?.expect}
            </Typography>
          </div>
          <div className="info-footer flex flex-col items-end mt-2">
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
      {/* answers */}
      <Answers />
    </div>
  );
};

export default ViewQuestion;
