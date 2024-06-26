import { connect } from "@/app/dbConfig/dbConfig";
import Question from "@/app/model/QuestionModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { questionId } = reqBody;
    // _id: new mongoose.Types.ObjectId(String(questionId)),
    const question = await Question.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(String(questionId)) },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $lookup: {
          from: "answers",
          localField: "answers",
          foreignField: "_id",
          as: "answersData",
        },
      },
    ]);
    if (question) {
      return NextResponse.json({
        msg: "Question api found",
        statusCode: 200,
        question: question[0],
      });
    }
    return NextResponse.json({
      msg: "Question not found",
      statusCode: 404,
      question,
    });
  } catch (error: any) {
    console.log("error in getqueston api", error);

    return NextResponse.json({
      msg: "getquestiondeatil api error",
      statusCode: 404,
      error,
    });
  }
}
