import { connect } from "@/app/dbConfig/dbConfig";
import Question from "@/app/model/QuestionModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { questionId } = reqBody;
    const question = await Question.findOne({
      _id: new mongoose.Types.ObjectId(String(questionId)),
    });

    if (question) {
      question.votes += 1;
      const votedQuestion = await question.save();

      return NextResponse.json({
        msg: "Vote added",
        statusCode: 200,
        votedQuestion,
      });
    }
    return NextResponse.json({ msg: "vote failed", statusCode: 404 });
  } catch (error: any) {
    return NextResponse.json({ msg: "error in upvote api", statusCode: 404 });
  }
}
