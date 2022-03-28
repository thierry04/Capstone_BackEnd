import { Router } from "express";
import queryController from '../controllers/query.controller';
import authMiddleware from '../middleware/auth';

const { sendMessages, findQueries } = queryController;
const {auth} = authMiddleware;

const QueriesRouter = Router();

QueriesRouter.route("/send-message").post(sendMessages);
QueriesRouter.route("/all-messages").get(auth, findQueries);

export default QueriesRouter;
