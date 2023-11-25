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

  async create(req: Request, res: Response) {
    const creteUserRequestBody = z.object({
      name: z.string(),
      username: z.string(),
      email: z.string(),
      password: z.string(),
    });

    const diretorioDeArquivos = "/mnt/teste";

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

      return res.status(201).json({ message: "Usuário Cadastrado, faça login e começe a usar", newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Erro interno no servidor");
    }
  },

  async user(req: Request, res: Response) {
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

  async update(req: Request, res: Response) {
    const updateUserRequestBody = z.object({
      name: z.string(),
      username: z.string(),
      email: z.string(),
    });

    const {} = updateUserRequestBody.parse(req.body)

    try {
      return res.status(200).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },
};
