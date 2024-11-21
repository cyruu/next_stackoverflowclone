import { connect } from "@/app/dbConfig/dbConfig";
import Question from "@/app/model/QuestionModel";
import TestModel from "@/app/model/TestModel";
import User from "@/app/model/UserModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("inside testing api, making db call");
    await connect();
    console.log("db call success");
    console.log("adding question");

    const testData = await Question.findOne();
    console.log("getting question test data", testData);
    return NextResponse.json({ msg: "response form testing api" });
  } catch (error) {
    console.log("testing api error", error);
  }
}
