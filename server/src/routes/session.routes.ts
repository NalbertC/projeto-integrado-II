import { Router } from "express";
import SessionController from "../controllers/SessionController";

const sessionRoutes = Router();

sessionRoutes.post("/login", SessionController.login);
sessionRoutes.post("/forgot_pass", SessionController.forgot);
sessionRoutes.post("/reset_pass/:token" , SessionController.reset)


export { sessionRoutes };
