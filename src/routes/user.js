import { Router } from "express";
import { createUser, DeleteUser, findOneUser, findUser, updateUser } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/", createUser)
userRoutes.post("/", createUser);
userRoutes.get("/", findUser);
userRoutes.get("/:id", findOneUser);
userRoutes.patch("/:id", updateUser);
userRoutes.delete("/:id", DeleteUser);

export default userRoutes