import mongoose from "mongoose";

const querySchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone:{type: String, required:true},
    query: { type: String, required: true },
});
export default mongoose.model("Query", querySchema);