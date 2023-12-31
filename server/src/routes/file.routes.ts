import { Router } from "express";
import multer from "multer";
import multerConfig from "../configs/multer";
import FileController from "../controllers/FileController";
import { ensureAuthenticated } from "../middlewares/authentication";

const fileRoutes = Router();

fileRoutes.get("/", ensureAuthenticated, FileController.index);
fileRoutes.get("/user", ensureAuthenticated, FileController.getUserFiles);
fileRoutes.post(
  "/upload",
  ensureAuthenticated,
  multer(multerConfig).single("file"),
  FileController.uploadFile
);
fileRoutes.put("/file/:fileId", ensureAuthenticated, FileController.updateFile);
fileRoutes.delete(
  "/file/:fileId",
  ensureAuthenticated,
  FileController.deleteFile
);
fileRoutes.get(
  "/download/file/:fileId",
  ensureAuthenticated,
  FileController.downloadFile
);

export { fileRoutes };
