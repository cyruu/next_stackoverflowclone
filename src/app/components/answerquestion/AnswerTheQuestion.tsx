"use client";
import { Button, ListItem, Typography, List, Modal, Box } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { notify } from "@/app/helpers/notify";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
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
const AnswerTheQuestion = ({ questionId }: any) => {
  const loggedInUser = useSelector((state: any) => state.loggedInUser);
  const { register, handleSubmit, formState, control } = useForm();
  const { errors }: any = formState;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSubmit = async (data: any) => {
    //post answer
    // const queRes = await axios.post("/api/questions/postquestion", postData);
    // setLoading(true);
    try {
      const { answer } = data;

      const hostedDomain = process.env.HOSTED_DOMAIN;
      // const hostedDomain = "http://localhost:3000";
      axios.defaults.baseURL = hostedDomain;
      setLoading(true);
      const ansRes = await axios.post(`/api/questions/postanswer`, {
        answerDetail: answer,
        username: loggedInUser.username,
        questionId,
      });
      console.log("post answer res", ansRes.data);
      notify(ansRes.data.msg, ansRes.data.statusCode);
      if (ansRes.data.statusCode == 200) {
        setLoading(false);
        // console.log("added answerrrrrrrrrrrrrr");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }

      // setLoading(false);
    } catch (error: any) {
      console.log("answer submit error", error);
    }
  };
  let className =
    "text-xs p-2 rounded-md outline-blue-400 w-full mt-3 border broder-gray-1000 border-2 sm:text-sm";
  if (errors.answer) {
    className += " outline-red-600 border-red-600";
  }
  return (
    <div className="mt-5">
      <ToastContainer />
      <Typography variant="h6">Your Answer</Typography>
      <form>
        <textarea
          className={className}
          {...register("answer", {
            required: {
              value: true,
              message: "Answer required.",
            },
          })}
        ></textarea>
        {errors.answer ? (
          <p className="text-xs  text-red-600">{errors.answer.message}</p>
        ) : (
          ""
        )}
        <div className="stackmessage bg-yellow-100 mt-4 border border-yellow-400 p-3 rounded-lg">
          <Typography className=" text-xs">
            Thanks for contributing an answer.
          </Typography>
          <List className="p-0 ">
            <ListItem className="p-0 flex items-center my-2 ml-3">
              <Typography variant="body2" className="flex text-xs">
                <FiberManualRecordIcon className="text-xs mr-1 mt-0.5" />
                Summarize your problem in a one-line title.
              </Typography>
            </ListItem>
            <Typography className="text-xs">But avoid ...</Typography>
            <ListItem className="p-0 flex items-center my-2 ml-3">
              <Typography variant="body2" className="flex text-xs">
                <FiberManualRecordIcon className="text-xs mr-1 mt-0.5" />
                Asking for help, clarification, or responding to other answers.
              </Typography>
            </ListItem>
            <ListItem className="p-0 flex items-center my-2 ml-3">
              <Typography variant="body2" className="flex text-xs">
                <FiberManualRecordIcon className="text-xs mr-1 mt-0.5" />
                Making statements based on opinion; back them up with references
                or personal experience.
              </Typography>
            </ListItem>
          </List>
        </div>
        {/* <Button
          type="submit"
          disableElevation
          variant="contained"
          size="medium"
          className="py-1 px-2 mt-5 mb-10"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Post your answer
        </Button> */}
        <Button
          onClick={handleOpen}
          variant="contained"
          className="mt-4 mb-8"
          disableElevation
        >
          Post your answer
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
            {errors.answer ? (
              <Button variant="contained" disabled className="py-1 px-3 mr-3">
                Invalid Form Data
              </Button>
            ) : loading ? (
              <LoadingButton
                size="small"
                color="error"
                loading={loading}
                loadingPosition="end"
                variant="contained"
              >
                <span className="mr-6">Posting</span>
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                disableElevation
                variant="contained"
                size="medium"
                className="p-1 px-2 mr-3"
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Post Answer
              </Button>
            )}
            <Button
              disableElevation
              onClick={handleClose}
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

export default AnswerTheQuestion;
