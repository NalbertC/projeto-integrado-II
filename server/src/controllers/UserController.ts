import "dotenv/config";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { prisma } from "../models";
import { encriptPassword } from "../services/auth";

export default {
  async index(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async createUser(req: Request, res: Response) {
    const creteUserRequestBody = z.object({
      name: z.string(),
      username: z.string(),
      email: z.string(),
      password: z.string(),
    });

    const diretorioDeArquivos = process.env.ROOT_PATH!;

    const { name, username, email, password } = creteUserRequestBody.parse(
      req.body
    );

    try {
      const verifyUser = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (verifyUser) {
        return res.status(400).json("Nome de usuario já cadastrado");
      }

      const verifyEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (verifyEmail) {
        return res.status(400).json("Email já cadastrado");
      }

      const encriptedPass = await encriptPassword(password);

      const filePath = path.join(diretorioDeArquivos, username);

      fs.mkdir(filePath, (err) => {
        if (err) {
          console.error("Erro ao criar a pasta:", err);
        } else {
          console.log("Pasta criada com sucesso.");
        }
      });

      const newUser = await prisma.user.create({
        data: {
          name,
          username,
          email,
          password: encriptedPass,
        },
      });

      return res.status(201).json({
        message: "Usuário Cadastrado, faça login e começe a usar",
        newUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Erro interno no servidor");
    }
  },

  async getUser(req: Request, res: Response) {
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

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async updateUser(req: Request, res: Response) {
    const updateUserRequestBody = z.object({
      name: z.string(),
      username: z.string(),
      email: z.string(),
    });
    const userLoginRequestBody = z.object({
      userId: z.string(),
    });

    const { userId } = userLoginRequestBody.parse(req);

    const { email, name, username } = updateUserRequestBody.parse(req.body);

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json("User does not exists");
      }

      const verifyUser = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (verifyUser) {
        return res.status(400).json("Nome de usuario já cadastrado");
      }

      const verifyEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (verifyEmail) {
        return res.status(400).json("Email já cadastrado");
      }

      const updateUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          email,
          name,
          username,
        },
      });

      return res.status(200).json();

    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async deleteUser(req: Request, res: Response) {
    const userLoginRequestBody = z.object({
      userId: z.string(),
    });

    const { userId } = userLoginRequestBody.parse(req);

    const diretorioDeArquivos = process.env.ROOT_PATH!;

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json("User does not exists");
      }

      const deleteUser = await prisma.user.delete({
        where: {
          id: user.id,
        },
        include: {
          files: true,
        },
      });

      const filePath = path.join(diretorioDeArquivos, deleteUser.username);

      if (deleteUser) {
        fs.rmdir(filePath, { recursive: true }, (err) => {
          if (err) {
            console.error("Erro ao excluir a pasta:", err);
            return res.status(500).json("Erro interno no servidor");
          } else {
            console.log("Pasta excluida com sucesso.");
            return res.status(200).json("Usuário deletado");
          }
        });
      }

    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },
};
