"use client";
import axios from "axios";
import HeaderQuestionBar from "./question/HeaderQuestionBar";
import QuestionsList from "./question/QuestionsList";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import SkeletonComponent from "./SkeletonComponent";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PaginationSkeleton from "./PaginationSkeleton";
const QuestionBar = ({ searchTerm }: any) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState("newest");
  const [questionsFound, setQuestionsFound] = useState(0);
  const limit = Array.from({ length: 4 }, (_, index) => index + 1);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  async function getInitialQuestions(page: Number) {
    try {
      console.log("getting questions");

      setLoading(true);
      const res = await axios.post(`api/questions/getquestions`, {
        pageNo: page,
        filterMode,
        searchTerm,
        // zeroVotes: true,
      });
      console.log("api respone", res);

      if (res.data.statusCode == 200) {
        setTotalPages(res.data.totalPages);
        setQuestions(res.data.questions);
        setQuestionsFound(res.data.totalQuestions);
        setLoading(false);
      }
      console.log("question response", res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getInitialQuestions(page);
  }, [page, filterMode, searchTerm]);

  const handlePageChange = (event: any, value: any) => {
    setPage(value);
  };
  return (
    <div className="ml-0 sm:ml-16">
      <HeaderQuestionBar
        setTotalPages={setTotalPages}
        setQuestions={setQuestions}
        // setLoading={setLoading}
        searchTerm={searchTerm}
        loading={loading}
        setPage={setPage}
        filterMode={filterMode}
        setFilterMode={setFilterMode}
        questionsFound={questionsFound}
      />

      {loading ? (
        <div className="min-h-[89vh]">
          {limit.map((ele) => (
            <SkeletonComponent key={ele} />
          ))}
          <PaginationSkeleton />
        </div>
      ) : questionsFound > 0 ? (
        <div className="min-h-[89vh]">
          <QuestionsList questions={questions} />
          <div className=" flex justify-center my-16">
            <Stack spacing={2} className="">
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
      ) : (
        <div className="text-center min-h-[89vh]">No Result Found</div>
      )}
    </div>
  );
};

export default QuestionBar;
