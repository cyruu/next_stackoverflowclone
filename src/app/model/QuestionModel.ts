import mongoose, { Schema } from "mongoose";

const questionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  userEmail: {
    type: String,
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
  codeSnippets: [
    {
      codeDetail: {
        type: String,
      },
      codeMain: {
        type: String,
      },
    },
  ],
  answers: [{ type: mongoose.Schema.Types.ObjectId }],

  createdAt: Date,
  ansCount: Number,
  votes: Number,
});

const Question =
  mongoose.models.questions || mongoose.model("questions", questionSchema);
export default Question;
