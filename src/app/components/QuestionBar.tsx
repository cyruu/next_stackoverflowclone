"use client";
import axios from "axios";
import HeaderQuestionBar from "./question/HeaderQuestionBar";
import QuestionsList from "./question/QuestionsList";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import SkeletonComponent from "./SkeletonComponent";
const QuestionBar = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const limit = Array.from({ length: 4 }, (_, index) => index + 1);
  async function getInitialQuestions() {
    try {
      console.log("getting questions");
      const res = await axios.get("api/questions/getquestions");
      if (res.data.statusCode == 200) {
        setQuestions(res.data.questions);
        setLoading(false);
      }
      console.log("question response", res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getInitialQuestions();
  }, []);
  return (
    <div className="ml-0 sm:ml-10">
      <HeaderQuestionBar />

      {loading ? (
        limit.map((ele) => <SkeletonComponent key={ele} />)
      ) : (
        <QuestionsList questions={questions} />
      )}
      {/* <SkeletonComponent /> */}
    </div>
  );
};

export default QuestionBar;
