import Question from "@/app/model/QuestionModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/app/model/UserModel";
export const revalidate = 0;
connect();
export async function POST(request: NextRequest) {
  try {
    console.log("inside api getquesions");
    const reqBody = await request.json();
    const { pageNo, filterMode = "newest", searchTerm = "" } = reqBody;
    const limit = 4;

    let offset = (pageNo - 1) * limit;
    // get total questions

    // const questions = await Question.find();

    let pipeline: any[] = [
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          "user.password": 0,
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort by createdAt field in descending order (newest first)
      },
    ];
    let totalQuestions = 0;
    if (filterMode == "unanswered") {
      if (searchTerm) {
        pipeline.push({
          $match: {
            ansCount: 0,
            title: { $regex: searchTerm, $options: "i" },
          },
        });
        totalQuestions = await Question.countDocuments({
          ansCount: 0,
          title: { $regex: searchTerm, $options: "i" },
        });
      }
      // no serach term
      else {
        pipeline.push({ $match: { ansCount: 0 } });
        totalQuestions = await Question.countDocuments({ ansCount: 0 });
      }
      // limit chain kina vane limit 3 halda newest ma tintai thyo
      // tara unanswered ma 2 ota matra aaira thyo
      pipeline.push({
        $skip: offset,
      });
      pipeline.push({
        $limit: limit,
      });
      // offset = (pageNo - 1) * (limit + 1);
    }
    // newest
    else {
      if (searchTerm) {
        pipeline.push({
          $match: {
            title: { $regex: searchTerm, $options: "i" },
          },
        });
        totalQuestions = await Question.countDocuments({
          title: { $regex: searchTerm, $options: "i" },
        });
      }
      // no search term
      else {
        totalQuestions = await Question.countDocuments();
      }
      pipeline.push({
        $skip: offset,
      });
      pipeline.push({
        $limit: limit,
      });
    }

    const totalPages = Math.ceil(totalQuestions / limit);

    // main query to database
    const questions = await Question.aggregate(pipeline);

    // _id: new mongoose.Types.ObjectId("665ca988a63f57feb0e108f5"),
    // also get the user details to pass it to questons

    if (questions) {
      return NextResponse.json({
        msg: "Questions found",
        statusCode: 200,
        questions,
        totalPages,
        totalQuestions,
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
