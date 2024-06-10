"use client";
import { Divider, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import React, { useEffect, useRef, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import ViewQuestionSkeleton from "./ViewQuestionSkeleton";
import Answers from "./answerquestion/Answers";
import AnswerTheQuestion from "./answerquestion/AnswerTheQuestion";
// import { coy } from "react-syntax-highlighter/dist/esm/styles/hljs";
import axios from "axios";
const ViewQuestion = ({ questionId }: any) => {
  const [question, setQuestion] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [year, setyear] = useState<any>();
  const [month, setmonth] = useState<any>();
  const [day, setday] = useState<any>();
  const [hour, sethour] = useState<any>();
  const [minutes, setminutes] = useState<any>();
  const [mainCode, setMainCode] = useState("");
  const [voteCount, setVoteCount] = useState(1);
  const codeRef = useRef<any>();

  const hostedDomain = process.env.HOSTED_DOMAIN;

  // const hostedDomain = "http://localhost:3000";
  async function getQuestionDetail() {
    try {
      // const hostedDomain = process.env.HOSTED_DOMAIN;
      // const hostedDomain = "http://localhost:3000";
      axios.defaults.baseURL = hostedDomain;
      setLoading(true);
      // await wait();
      // const res = await axios.post(
      //   `http://localhost:3000/api/questions/getquestiondetail`,
      //   { questionId }
      // );
      const res = await axios.post(`/api/questions/getquestiondetail`, {
        questionId,
      });
      console.log("single ques response", res);

      if (res.data.statusCode == 200) {
        setQuestion(res.data.question);
        setLoading(false);
      }
      setLoading(false);
      console.log("view question response", res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getQuestionDetail();
  }, []);
  useEffect(() => {
    if (question) {
      const date = new Date(question.createdAt);
      setyear(date.getFullYear());
      setmonth(date.getMonth());
      setday(date.getDay());
      sethour(date.getHours());
      setminutes(date.getMinutes());
      setVoteCount(question.votes);
    }
  }, [loading]);
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
          <Typography className="text-gray-400 text-xs">
            asked {year}/{month}/{day} at {hour}:{minutes}
          </Typography>
        </div>
        <Divider />
      </div>
      <div className="content mt-5 flex mb-5">
        <div className="votes pr-3 sm:pr-5 ">
          <div className="voteitems flex flex-col items-center">
            <button
              className="voteicon border border-gray-300 p-1 rounded-full"
              onClick={async () => {
                setVoteCount((prev: number) => prev + 1);
                // const hostedDomain = process.env.HOSTED_DOMAIN;
                // const hostedDomain = "http://localhost:3000";
                axios.defaults.baseURL = hostedDomain;
                const res = await axios.post(
                  `${hostedDomain}/api/questions/voteup`,
                  {
                    questionId,
                  }
                );
                if (res.data.statusCode == 200) {
                  setVoteCount(res.data.votedQuestion.votes);
                }
              }}
            >
              <PlayArrowIcon className="rotate-[-90deg]" />
            </button>
            <Typography variant="h6" className="my-1">
              {voteCount}
            </Typography>
            {/* <button className="voteicon border border-gray-300 p-1 rounded-full">
              <PlayArrowIcon className="rotate-90" />
            </button> */}
            <button className="saveicons">
              <BookmarkBorderIcon className="text-gray-400 mt-3" />
            </button>
          </div>
        </div>
        <div className="info w-[85%] sm:w-full ">
          <div className="details">
            <Typography className="text-sm mb-4 sm:text-md">
              {question?.details}
            </Typography>

            {/* codesnippets */}
            {question?.codeSnippets?.length > 0 ? (
              <div className="codesnippet">
                <div
                  dangerouslySetInnerHTML={{
                    __html: question?.codeSnippets[0].codeMain,
                  }}
                  ref={codeRef}
                  className="absolute text-xs opacity-0 w-1 overflow-x-hidden  pointer-events-none"
                  // className="hidden"
                ></div>
                <div className="codesnippetdetail">
                  <Typography className="text-sm mb-4 sm:text-md">
                    {question?.expect}
                  </Typography>
                </div>
                <div className="codesnippetcode mb-4">
                  <SyntaxHighlighter
                    language="javascript"
                    className="w-[255px] bg-red-400 text-xs max-h-72 rounded-lg overflow-x-hidden sm:w-full"
                  >
                    {question &&
                    !loading &&
                    Array.isArray(question.codeSnippets) &&
                    question.codeSnippets[0]?.codeMain &&
                    codeRef?.current
                      ? codeRef.current.innerText
                      : ""}
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
            <div className="user bg-blue-50 py-1.5 px-2 w-40 rounded-md">
              <Typography className="text-xs mb-1 text-gray-500">
                asked {year}/{month}/{day} at {hour}:{minutes}
              </Typography>
              <div className="userinfo flex items-center">
                <div className="userpic mr-1 h-[25px] w-[25px] bg-blue-500 rounded-md flex items-center justify-center text-white ">
                  <Typography className="text-sm">C</Typography>
                </div>
                <Typography className="text-xs text-blue-600">
                  {question.userDetails.username}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      {/* answers */}
      <Answers question={question} />
      {/* answerthequestion */}
      <AnswerTheQuestion questionId={questionId} />
    </div>
  );
};

export default ViewQuestion;
