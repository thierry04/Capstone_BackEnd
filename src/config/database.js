import mongoose from "mongoose";
import "dotenv/config"

const { MONGO_URL, MONGO_TEST_URL,NODE_ENV} = process.env;

const connectDb = async()=>{
    try{
        await mongoose.connect(
            NODE_ENV === 'test' ? MONGO_TEST_URL : MONGO_URL,{useNewUrlParser:true}
        )
        await console.log("connected to database successfully");
    }catch(err){
        console.log("failed to connect to the database",err);
    }
}
export default connectDb;