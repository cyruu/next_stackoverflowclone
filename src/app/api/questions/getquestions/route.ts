import Question from "@/app/model/QuestionModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/app/model/UserModel";
export const revalidate = 0;
connect();
export async function GET(request: NextRequest) {
  try {
    console.log("inside api getquesions");

    // const questions = await Question.find();
    const questions = await Question.aggregate([
      {
        $lookup: {
          // users colleciton ko name
          from: "users",
          //question ko ma vako userid
          localField: "userId",
          // users ma vako primary _id
          foreignField: "_id",
          /// rename gareko
          as: "user",
        },
      },
      //multiple document lai hataune
      {
        $unwind: "$user",
      },
      {
        // dont get password from users collection
        $project: {
          "user.password": 0,
        },
      },
    ]);
    // _id: new mongoose.Types.ObjectId("665ca988a63f57feb0e108f5"),
    // also get the user details to pass it to questons

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
