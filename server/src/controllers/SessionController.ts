import crypto from "crypto";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { z } from "zod";
import { authConfig } from "../configs/authConfig";
import { prisma } from "../models";
import { comparePassword, encriptPassword } from "../services/auth";
import mailer from "../services/mail";

export default {
  async authenticateUser(req: Request, res: Response) {
    const userLoginRequestBody = z.object({
      email: z.string(),
      password: z.string(),
    });

    const { email, password } = userLoginRequestBody.parse(req.body);

    try {
      const userAlreadExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      // verificar se usuario existe
      if (!userAlreadExists) {
        return res.status(400).json("Email ou senha incorretos");
      }
      // verificar se a senha esta correta
      const verifyPassword = await comparePassword(
        password,
        userAlreadExists.password
      );

      if (!verifyPassword) {
        return res.status(400).json("Email ou senha incorretos");
      }

      // gerar token do usuario
      const token = sign({}, authConfig.secret!, {
        subject: userAlreadExists.id,
        expiresIn: authConfig.expiresIn,
      });

      return res.status(201).json({
        user: {
          id: userAlreadExists.id,
          name: userAlreadExists.name,
          username: userAlreadExists.username,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Erro interno no servidor");
    }
  },

  async forgot(req: Request, res: Response) {
    const forgotPassBody = z.object({
      email: z.string(),
    });
    const { email } = forgotPassBody.parse(req.body);
    try {
      const verifyEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!verifyEmail) {
        return res.status(400).json("Email does notexists");
      }
      const token = crypto.randomBytes(20).toString("hex");

      const dateExpirationToken = new Date();
      dateExpirationToken.setHours(dateExpirationToken.getHours() + 1);

      const saveToken = await prisma.user.update({
        where: {
          id: verifyEmail.id,
        },
        data: {
          tokenResetPass: token,
          dateExpirationToken,
        },
      });

      await mailer.emailRecoveryPass(saveToken.email, token);

      console.log(token, saveToken.dateExpirationToken);

      return res.status(200).json("Check your email");
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async redefinePassword(req: Request, res: Response) {
    const redefinePassBody = z.object({
      email: z.string(),
      password: z.string(),
    });

    const tokenValidationParams = z.object({
      token: z.string(),
    });

    const { email, password } = redefinePassBody.parse(req.body);
    const { token } = tokenValidationParams.parse(req.params);

    try {
      const verifyEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!verifyEmail) {
        return res.status(404).json("User does not exists");
      }

      if (token !== verifyEmail.tokenResetPass) {
        return res.status(401).json("Invalid token");
      }

      const now = new Date();

      if (now > verifyEmail.dateExpirationToken!) {
        return res
          .status(401)
          .json("Expired token, generate new token on forgot password");
      }

      const encriptedPass = await encriptPassword(password);

      await prisma.user.update({
        where: {
          id: verifyEmail.id,
        },
        data: {
          password: encriptedPass,
          tokenResetPass: null,
          dateExpirationToken: null,
        },
      });

      return res.status(200).json("Successfully updated password");
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },
};
