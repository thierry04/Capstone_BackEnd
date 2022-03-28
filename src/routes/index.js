import { Router } from "express";
import ArticleRouter from "./article.routes";
import profileRouter from "./profile.routes";
import QueriesRouter from "./queries.routes";
import commentRouter from "./comment.routes";

const allRoutes = Router();

allRoutes.use("/posts", ArticleRouter);
allRoutes.use("/users", profileRouter);
allRoutes.use("/queries", QueriesRouter);
allRoutes.use("/", commentRouter);

export default allRoutes;
