"use client";
import axios from "axios";
import HeaderQuestionBar from "./question/HeaderQuestionBar";
import QuestionsList from "./question/QuestionsList";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import SkeletonComponent from "./SkeletonComponent";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const QuestionBar = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const limit = Array.from({ length: 4 }, (_, index) => index + 1);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  async function getInitialQuestions(page: Number) {
    try {
      console.log("getting questions");
      setLoading(true);
      const res = await axios.post(`api/questions/getquestions`, {
        pageNo: page,
        // zeroVotes: true,
      });
      if (res.data.statusCode == 200) {
        setTotalPages(res.data.totalPages);
        setQuestions(res.data.questions);
        setLoading(false);
      }
      console.log("question response", res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getInitialQuestions(page);
  }, [page]);

  const handlePageChange = (event: any, value: any) => {
    setPage(value);
  };
  return (
    <div className="ml-0 sm:ml-16">
      <HeaderQuestionBar
        setTotalPages={setTotalPages}
        setQuestions={setQuestions}
        setLoading={setLoading}
      />

      {loading ? (
        limit.map((ele) => <SkeletonComponent key={ele} />)
      ) : (
        <QuestionsList questions={questions} />
      )}
      <div className=" flex justify-center my-16">
        <Stack className="">
          <Pagination
            count={totalPages}
            variant="outlined"
            shape="rounded"
            size="small"
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default QuestionBar;
