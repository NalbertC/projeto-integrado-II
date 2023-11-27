import { Request, Response } from "express";
import fs from "fs";
import { promisify } from "util";
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

  async uploadFile(req: Request, res: Response) {
    const createPostReqFile = z.object({
      originalname: z.string(),
      key: z.string(),
      size: z.number(),
      path: z.string(),
    });

    const userAutenticated = z.object({
      userId: z.string(),
    });

    const { userId } = userAutenticated.parse(req);

    const { originalname, key, size, path } = createPostReqFile.parse(req.file);

    try {
      const userExists = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userExists) {
        return res.status(401).json("User does not exists");
      }

      const nameExists = await prisma.file.findFirst({
        where: {
          userId: userExists.id,
          name: originalname,
        },
      });

      console.log(req.file);

      if (nameExists) {
        await promisify(fs.unlink)(path);
        return res.status(401).json("Arquivo com mesmo nome encontrado");
      }

      const newFile = await prisma.file.create({
        data: {
          userId: userExists.id,
          name: originalname!,
          key,
          size,
          path,
        },
      });

      return res.status(201).json("Arquivo enviado com sucesso!");
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async getUserFiles(req: Request, res: Response) {
    const userLoginRequestBody = z.object({
      userId: z.string(),
    });

    const { userId } = userLoginRequestBody.parse(req);

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          files: true,
        },
      });
      if (!user) {
        return res.status(404).json("User does not exists");
      }

      return res.status(200).json(user.files);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async updateFile(req: Request, res: Response) {
    const createPostReqBody = z.object({
      name: z.string(),
    });

    const userAutenticated = z.object({
      userId: z.string(),
    });

    const deleteFileRequestParams = z.object({
      fileId: z.string(),
    });
    const { userId } = userAutenticated.parse(req);
    const { fileId } = deleteFileRequestParams.parse(req.params);
    const { name } = createPostReqBody.parse(req.body);

    try {
      const userExists = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userExists) {
        return res.status(401).json("User does not exists");
      }

      const file = await prisma.file.findUnique({
        where: {
          id: fileId,
        },
      });

      if (!file) {
        return res.status(404).json("File does not exists");
      }

      const nameExists = await prisma.file.findFirst({
        where: {
          userId: userExists.id,
          name,
        },
      });

      if (nameExists) {
        return res.status(401).json("Arquivo com mesmo nome encontrado");
      }

      return res.status(200).json("Nome de arquivo válido");
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async deleteFile(req: Request, res: Response) {
    const userLoginRequestBody = z.object({
      userId: z.string(),
    });

    const deleteFileRequestParams = z.object({
      fileId: z.string(),
    });

    const { userId } = userLoginRequestBody.parse(req);
    const { fileId } = deleteFileRequestParams.parse(req.params);

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json("User does not exists");
      }

      const file = await prisma.file.findUnique({
        where: {
          id: fileId,
        },
      });

      if (!file) {
        return res.status(404).json("File does not exists");
      }

      const deleteFile = await prisma.file.delete({
        where: {
          id: file.id,
        },
      });

      if (deleteFile) {
        await promisify(fs.unlink)(deleteFile.path);
      }

      return res.status(200).json("Arquivo deletado");
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },
};
