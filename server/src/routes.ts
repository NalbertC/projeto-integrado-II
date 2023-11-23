import { Router } from "express";
import { sessionRoutes } from "./routes/session.routes";
import { userRoutes } from "./routes/user.routes";

const routes = Router();

routes.get("/", (req, res) => {
  return res.status(200).json("Hello World!");
});

// rota de sessão do usuário
routes.use("/", sessionRoutes)

// rotas de usuário
routes.use("/users", userRoutes);

export { routes };
