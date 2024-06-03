import Question from "@/app/model/QuestionModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
export async function GET(request: NextRequest) {
  try {
    const questions = await Question.find({
      // _id: new mongoose.Types.ObjectId("665ca988a63f57feb0e108f5"),
    });

    if (questions) {
      return NextResponse.json({
        msg: "Questions found",
        statusCode: 200,
        questions,
      });
    }
    return NextResponse.json({
      msg: "Questions notfound",
      statusCode: 404,
      questions,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "Db error",
      statusCode: 404,
      error: error,
    });
  }
}
