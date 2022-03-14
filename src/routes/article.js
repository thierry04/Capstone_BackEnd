import { Router } from "express";
import { createArticle, findArticle, findOneArticle, UpdateArticle, DeleteArticle } from "../controllers/article.controller";

const articleRoutes = Router();

articleRoutes.post("/", createArticle);
articleRoutes.get("/", findArticle);
articleRoutes.get("/:id",findOneArticle);
articleRoutes.patch("/:id",UpdateArticle);
articleRoutes.delete("/:id", DeleteArticle);
export default articleRoutes