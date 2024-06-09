import { connect } from "@/app/dbConfig/dbConfig";
import Answer from "@/app/model/AnswerModel";
import Question from "@/app/model/QuestionModel";
import QuestionId from "@/app/questions/[questionid]/page";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { answerDetail, username = "default", questionId } = reqBody;

    // add data to answers collection
    const answer = new Answer({
      username,
      answerDetail,
      createdAt: Date.now(),
      votes: 0,
    });
    // console.log("inside post answer api", username, answerDetail);

    const savedAnswer = await answer.save();
    // // add answer id to questions answers array
    const question = await Question.findOne({
      _id: new mongoose.Types.ObjectId(String(questionId)),
    });
    if (question) {
      question.answers.push(
        new mongoose.Types.ObjectId(String(savedAnswer._id))
      );
      await question.save();
      return NextResponse.json({
        msg: "Successfullly posted answer",
        statusCode: 200,
        question,
      });
    }

    return NextResponse.json({
      msg: "Failed to post answer",
      statusCode: 404,
      // savedAnswer,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "error posting answer inside api",
      statusCode: 404,
      error,
    });
  }
}
