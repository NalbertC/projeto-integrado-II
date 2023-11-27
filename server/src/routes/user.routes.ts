import { Router } from "express";
import UserController from "../controllers/UserController";
import { ensureAuthenticated } from "../middlewares/authentication";

const userRoutes = Router();

userRoutes.get("/", ensureAuthenticated, UserController.index);
userRoutes.post("/user", UserController.createUser);
userRoutes.get("/user",ensureAuthenticated, UserController.getUser);

export { userRoutes };
