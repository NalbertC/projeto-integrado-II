import { Router } from "express";
import SessionController from "../controllers/SessionController";

const sessionRoutes = Router();

sessionRoutes.post("/login", SessionController.login);

export { sessionRoutes };
