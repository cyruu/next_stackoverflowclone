import React from "react";
import { Grid } from "@mui/material";
import LeftSideBar from "@/app/components/LeftSideBar";
import ViewQuestion from "@/app/components/ViewQuestion";
import RightSideBar from "@/app/components/RightSideBar";
const QuestionId = ({ params }: any) => {
  return (
    <div>
      <Grid container>
        <Grid item sm={2} className="hidden sm:flex">
          <LeftSideBar />
        </Grid>
        <Grid item xs={12} sm={6} className=" sm:ml-2">
          <ViewQuestion questionId={params.questionid} />
        </Grid>
        <Grid item sm={5} className="hidden sm:flex">
          <RightSideBar />
        </Grid>
      </Grid>
    </div>
  );
};

export default QuestionId;
