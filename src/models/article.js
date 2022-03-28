import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String },
  imageUrl: { type: String },
  cloudinary_id: { type: String },
  commentsCount: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }],
});

export default mongoose.model("Article", articleSchema);
