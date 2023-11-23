import { Request, Response } from "express";
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
        return res.status(400).json("User already exists");
      }

      const verifyEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (verifyEmail) {
        return res.status(400).json("email already exists");
      }

      const encriptedPass = await encriptPassword(password);

      const newUser = await prisma.user.create({
        data: {
          name,
          username,
          email,
          password: encriptedPass,
        },
      });

      return res.status(201).json({ message: "User created", newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
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
          files: true
        }
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
};
