import mongoose from "mongoose";

const Queryschema = mongoose.Schema({
  guestName:{type:String, required:true},
  email:{type:String, required:true},
  message:{type:String, required:true}
})

export default mongoose.model("Query", Queryschema);
