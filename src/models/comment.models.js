import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    username: { type: String, required: true },
    comment: { type: String, required: true },
});
export default mongoose.model("Comment", commentSchema);