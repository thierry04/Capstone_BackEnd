import express from "express"
import "dotenv/config";
import cors from 'cors';
import connectDb from "./config/database";
import allRoutes from "./routes";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));
app.use(cors())
app.use(express.json())
connectDb();
app.use("/api/v1", allRoutes);
app.use('/',(req,res)=>{
    res.status(200).json({message:"Welcome to notion's"})
})
const port =process.env.PORT || 4000;

app.listen(port, console.log(`app is listening to port ${port}`))