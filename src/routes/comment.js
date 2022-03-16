import { Router } from "express";
import { createComment, findAllComments} from "../controllers/comment.contoller";
import authMiddleware from "../middleware/auth";

const commentRoutes = Router();
const { auth } = authMiddleware;

commentRoutes.post("/", createComment);
commentRoutes.get("/", auth, findAllComments);

export default commentRoutes