import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../models";

export default {
  async index(req: Request, res: Response) {
    try {
      const files = await prisma.file.findMany();

      return res.status(200).json(files);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async create(req: Request, res: Response) {
    try {
      const createPostReqFile = z.object({
        originalname: z.string().optional(),
        key: z.string().optional(),
      });

      const userAutenticated = z.object({
        userId: z.string(),
      });

      const { userId } = userAutenticated.parse(req);

      const userExists = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userExists) {
        return res.status(401).json("User does not exists");
      }

      const { originalname, key } = createPostReqFile.parse(req.file);

      let url = req.file.location;

      if (!url) {
        url = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/files/${key}`;
      }

      const newFile = await prisma.file.create({
        data: {
          userId: userExists.id,
          name: originalname!,
          key: key!,
          url: url!
        },
      });

      return res.status(201).json({
        req: req.file,
        newFile,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },
};
