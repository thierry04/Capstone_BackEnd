import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  time: { type: Date },
});
export default mongoose.model("comments", commentSchema);
