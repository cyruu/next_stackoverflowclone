import mongoose, { Schema } from "mongoose";

export const answerSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  answerDetail: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  votes: Number,
});

const Answer =
  mongoose.models.answers || mongoose.model("answers", answerSchema);
export default Answer;
