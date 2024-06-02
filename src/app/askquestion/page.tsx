"use client";
import { useForm } from "react-hook-form";
import AskQuestionHeader from "../components/askquestion/AskQuestionHeader";
import Title from "../components/askquestion/Title";
import Details from "../components/askquestion/Details";
import Expect from "../components/askquestion/Expect";
import React from "react";
import {
  Paper,
  TextField,
  Typography,
  Button,
  Modal,
  Box,
} from "@mui/material";
//style
const inputStyle =
  "text-xs p-2 rounded-md outline-blue-400 w-full mt-3 border broder-gray-1000 sm:text-sm";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#F0F0F0",
  color: "black",
  boxShadow: 24,
};
const AskQuestion = () => {
  const { register, handleSubmit, formState } = useForm();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { errors } = formState;
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className=" w-[93%] sm:w-2/3 mx-auto my-9">
      <form onSubmit={handleSubmit(onSubmit)}>
        <AskQuestionHeader />
        {/* title */}
        <Title
          register={register}
          className={inputStyle}
          placeholder="Title"
          type="text"
          registerName="title"
          errors={errors}
        />
        {/* details */}
        <Details
          register={register}
          className={inputStyle}
          type="text"
          registerName="details"
          errors={errors}
        />
        <Expect
          register={register}
          className={inputStyle}
          type="text"
          registerName="expect"
          errors={errors}
        />

        <Button onClick={handleOpen} variant="contained" disableElevation>
          Post Question
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="w-[90%] px-4 py-5 sm:w-max">
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.45rem",
                },
                fontWeight: "bold",
              }}
            >
              Confirm Question Submission
            </Typography>
            <Typography
              id="modal-modal-description"
              className="mt-2 sm:mt-5 mb-4 text-gray-500"
              sx={{
                fontSize: {
                  xs: "1rem",
                },
              }}
            >
              Are you sure you want to post this question?
            </Typography>
            <Button
              disableElevation
              onClick={handleClose}
              variant="contained"
              size="medium"
              className="p-1 mr-3"
              color="primary"
            >
              Post
            </Button>
            <Button
              disableElevation
              onClick={handleClose}
              variant="outlined"
              size="medium"
              className="p-1"
              color="error"
            >
              Cancel
            </Button>
          </Box>
        </Modal>
      </form>
    </div>
  );
};

export default AskQuestion;
