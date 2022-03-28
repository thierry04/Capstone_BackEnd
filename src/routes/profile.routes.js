import { Router } from "express";
import userController from "../controllers/user.controller";

const { signup, login, findProfiles, findUser, updateProfile, deleteProfile } =
  userController;

const profileRouter = Router();

profileRouter.route("/register").post(signup);
profileRouter.route("/login").post(login);
profileRouter.route("/").get(findProfiles);
profileRouter
  .route("/:id")
  .get(findUser)
  .put(updateProfile)
  .delete(deleteProfile);

export default profileRouter;
