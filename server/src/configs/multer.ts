import crypto from "crypto";
import multer from "multer";
import { prisma } from "../models";

export const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const verifyUser = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });

    cb(null, `/mnt/teste/${verifyUser?.username}`);
  },
  filename: (req, file: Express.MulterS3.File, callBack: any) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) {
        callBack(err);
      }
      file.key = `${hash.toString("hex")}-${file.originalname}`;

      callBack(null, file.key);
    });
  },
});

export default {
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024,
  },
};
