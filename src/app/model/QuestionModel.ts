import { ObjectId } from "bson";
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  userId: {
    type: ObjectId || String,
  },
  title: {
    type: String,
  },
  details: {
    type: String,
  },
  expect: {
    type: String,
  },
  createdAt: Date,
  ansCount: Number,
  votes: Number,
});

const Question =
  mongoose.models.questions || mongoose.model("questions", questionSchema);
export default Question;