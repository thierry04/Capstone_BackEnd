import {Router} from 'express';
import articleRoutes from "./article";

const allRoutes = Router();

allRoutes.use("/article", articleRoutes);

export default allRoutes;