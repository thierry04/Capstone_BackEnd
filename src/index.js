import express from 'express';
import morgan from "morgan";
import cors from "cors";
import { serve, setup } from "swagger-ui-express";
import connectdB from "./config/database";
import "dotenv/config";
import allRoutes from "./routes";
import docs from "./docs/swagger.json";

const app = express();
connectdB();
app.use(morgan("dev"));
app.use(cors())
app.use(express.json());
app.use("/api/v1", allRoutes);
app.use("/api/v1/docs", serve, setup(docs));
app.use((req, res) => {
  res.status(404).send({ message: "route not found" });
});

const port = process.env.PORT || 8080;

const server = app.listen(
  port,
  console.log("server is running on port:", port)
);
export default server;
