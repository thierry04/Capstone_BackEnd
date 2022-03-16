import {Router} from 'express';
import articleRoutes from "./article";
import userRoutes from './user';

const allRoutes = Router();

allRoutes.use("/article", articleRoutes);
allRoutes.use("/user",userRoutes);

export default allRoutes;