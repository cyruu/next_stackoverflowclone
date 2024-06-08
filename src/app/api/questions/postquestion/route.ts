import Question from "@/app/model/QuestionModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/app/model/UserModel";
import { log } from "console";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      title,
      details,
      expect,
      codesnippetdetail,
      codesnippetcode,
      userId,
    } = reqBody;
    // get userId by searching from email
    // const user = await User.findOne({ email: userEmail });

    // _id is object id
    const questionData: any = {
      userId,
      title,
      details,
      expect,
      votes: 0,
      ansCount: 0,
      createdAt: Date.now(),
    };

    if (codesnippetdetail || codesnippetcode) {
      questionData.codeSnippets = [
        {
          codeDetail: codesnippetdetail,
          codeMain: codesnippetcode,
        },
      ];
    }
    const newQuestion = new Question(questionData);
    const savedQuestion = await newQuestion.save();
    // when send response injson format is converts to string
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
