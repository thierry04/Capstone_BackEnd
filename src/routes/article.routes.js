import { Router } from "express";
import { upload } from "../middleware/ImageUpload";
import articleController from "../controllers/Article.controller";
import authMiddleware from "../middleware/auth";

const {
  createArticle,
  readAllArticles,
  singleArticle,
  updateOneArticle,
  removeArticle,
} = articleController;

const { auth } = authMiddleware;

const ArticleRouter = Router();

ArticleRouter.route('/')
  .post(auth, upload.single('imageUrl'), createArticle)
  .get(readAllArticles);
ArticleRouter.route("/:id")
  .get(singleArticle)
  .delete(auth, removeArticle)
  .put(auth, upload.single("imageUrl"), updateOneArticle);

export default ArticleRouter;
