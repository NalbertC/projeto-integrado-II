import { Router } from "express";
import multer from "multer";
import multerConfig from "../configs/multer";
import FileController from "../controllers/FileController";
import { ensureAuthenticated } from "../middlewares/authentication";

const fileRoutes = Router();

fileRoutes.get("/", ensureAuthenticated, FileController.index);
fileRoutes.post(
  "/upload",
  ensureAuthenticated,
  multer(multerConfig).single("file"),
  FileController.create
);

export { fileRoutes };
