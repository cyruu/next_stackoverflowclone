"use client";
import axios from "axios";
import HeaderQuestionBar from "./question/HeaderQuestionBar";
import QuestionsList from "./question/QuestionsList";
import React, { useEffect, useState } from "react";

const QuestionBar = () => {
  const [questions, setQuestions] = useState([]);
  async function getInitialQuestions() {
    try {
      console.log("getting questions");
      const res = await axios.get("api/questions/getquestions");
      if (res.data.statusCode == 200) {
        setQuestions(res.data.questions);
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
    <div>
      <HeaderQuestionBar />
      <QuestionsList questions={questions} />
    </div>
  );
};

export default QuestionBar;
