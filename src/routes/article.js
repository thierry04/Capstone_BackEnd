import { Router } from "express";
import { createArticle, findArticle, findOneArticle, UpdateArticle, DeleteArticle } from "../controllers/article.controller";
import authMiddleware from "../middleware/auth";

const articleRoutes = Router();
const {auth} = authMiddleware;

articleRoutes.post("/",auth, createArticle);
articleRoutes.get("/", findArticle);
articleRoutes.get("/:id",findOneArticle);
articleRoutes.patch("/:id",auth,UpdateArticle);
articleRoutes.delete("/:id",auth, DeleteArticle);
export default articleRoutes