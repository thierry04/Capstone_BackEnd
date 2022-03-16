import { verifyToken } from "../helper/auth";
import bcryptjs from "bcryptjs";

class authMiddleware {
    static async auth(req, res, next) {
        try {
            const verifyRoutes = req.headers.authorization?.split(" ")[1];
            if (!verifyRoutes || verifyRoutes === undefined)
                return res.status(401).json({message:"please login first"})
            const user = verifyToken(verifyRoutes);

            req.user = user;
            return next();
        } catch (error) {
            console.log(error);
            return res.status(403).json({message:"you are not allowed"})
        }
    }
}
export default authMiddleware;