import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    Username: { type: String },
    email: { type: String },
    password: { type: String },
});
export default mongoose.model("User", userSchema);