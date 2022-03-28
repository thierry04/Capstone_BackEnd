import { Router } from "express";
import commentsController from "../controllers/comment.controller";

const { createComments, getAllComments, likeArticle } = commentsController;

const commentRouter = Router();

commentRouter.route('/post/:id/likes').post(likeArticle);
commentRouter.route("/:id/comment").post(createComments);
commentRouter.route("/:id/all-comments").get(getAllComments);

export default commentRouter;
