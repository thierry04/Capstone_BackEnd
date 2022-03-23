import { Router } from "express";
import { createUser, DeleteUser,login, findOneUser, findUser, updateUser } from "../controllers/user.controller";
import authMiddleware from "../middleware/auth";

const userRoutes = Router();
const {auth} = authMiddleware;

userRoutes.post("/", createUser)
userRoutes.get("/", findUser);
userRoutes.get("/:id", findOneUser);
userRoutes.patch("/:id", updateUser);
userRoutes.delete("/:id",auth, DeleteUser);
userRoutes.post('/login',login)

export default userRoutes