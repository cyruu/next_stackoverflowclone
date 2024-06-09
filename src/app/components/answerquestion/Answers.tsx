import React from "react";
import Answer from "./Answer";

const Answers = ({ question }: any) => {
  if (question?.answersData?.length == 0) {
    return <div></div>;
  }
  return (
    <div>
      {question?.answersData?.map((answer: any) => {
        return <Answer key={answer._id} answer={answer} />;
      })}
    </div>
  );
};

export default Answers;
