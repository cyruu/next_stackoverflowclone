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
        <Grid item xs={12} sm={7} className="">
          <ViewQuestion />
        </Grid>
        <Grid item sm={3} className="hidden sm:flex">
          <RightSideBar />
        </Grid>
      </Grid>
    </div>
  );
};

export default QuestionId;
