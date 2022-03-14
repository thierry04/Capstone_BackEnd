import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
    title:{type:String},
    content:{type:String},
});
export default mongoose.model("Article", articleSchema);