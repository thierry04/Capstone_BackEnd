import { Router } from "express";
import { createQuery,deleteQuery,findAllQueries,findOneQuery, updateQuery } from "../controllers/query";
import authMiddleware from "../middleware/auth";

const queryRoutes = Router();
const { auth } = authMiddleware;

queryRoutes.post("/",  createQuery);
queryRoutes.get("/",auth, findAllQueries);
queryRoutes.get("/:id", findOneQuery);
queryRoutes.patch("/:id",auth, updateQuery);
queryRoutes.delete("/:id",auth, deleteQuery);
export default queryRoutes