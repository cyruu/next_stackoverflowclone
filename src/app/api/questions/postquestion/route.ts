import Question from "@/app/model/QuestionModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/dbConfig/dbConfig";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, details, expect } = reqBody;

    const newQuestion = new Question({
      title,
      details,
      expect,
      createdAt: Date.now(),
    });
    const savedQuestion = await newQuestion.save();
    if (savedQuestion) {
      return NextResponse.json({
        msg: "Question Posted",
        statusCode: 200,
        savedQuestion,
      });
    }
    return NextResponse.json({
      msg: "Failed to post.",
      statusCode: 404,
      savedQuestion,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      msg: "db failed",
      statusCode: 404,
      error: error,
    });
  }
}
