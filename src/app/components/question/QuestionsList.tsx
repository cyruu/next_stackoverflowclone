"use client";
import React from "react";
import Question from "./Question";
const QuestionsList = ({ questions }: any) => {
  return (
    <div>
      {questions?.map((question: any) => {
        return <Question key={question._id} question={question} />;
      })}
    </div>
  );
};

export default QuestionsList;
