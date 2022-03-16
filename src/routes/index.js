import {Router} from 'express';
import articleRoutes from "./article";
import userRoutes from './user';
import queryRoutes from './query';
import commentRoutes from './comment';

const allRoutes = Router();

allRoutes.use("/article", articleRoutes);
allRoutes.use("/user",userRoutes);
allRoutes.use("/query", queryRoutes);
allRoutes.use("/comment",commentRoutes )

export default allRoutes;