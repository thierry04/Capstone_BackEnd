import mongoose from "mongoose";
import "dotenv/config";

const { MONGO_URL, MONGO_URL_TEST_ONLINE, NODE_ENV } = process.env;

const connectdB = async () => {
  try {
    await mongoose.connect(
      NODE_ENV === "test" ? MONGO_URL_TEST_ONLINE : MONGO_URL,
      {
        useNewUrlParser: true,
      }
    );
    await console.log("connected to database Successfully");
  } catch (err) {
    await console.log("failes to connect to database", err);
  }
};
export default connectdB;
