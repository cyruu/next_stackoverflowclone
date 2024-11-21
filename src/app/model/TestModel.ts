import mongoose, { Schema } from "mongoose";

const testSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});
const TestModel =
  mongoose.models.testdatas || mongoose.model("testdata", testSchema);
export default TestModel;
