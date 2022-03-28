import { verifyToken } from "../helper";
import Response from "../utils";

class authMiddleware {
  static async auth(req, res, next) {
    try {
      const verifyRoutes = req.headers.authorization?.split(" ")[1];
      if (!verifyRoutes || verifyRoutes === undefined)
        return Response.error(res, 401, "please login first");
      const user = verifyToken(verifyRoutes);

      req.user = user;
      return next();
    } catch (error) {
      return Response.error(res, 403, "you are not allowed", error);
    }
  }
}
export default authMiddleware;
