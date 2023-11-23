import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
dotenv.config();

import { routes } from "./routes";

const server = express();

// middleware
server.use(cors());
server.use(morgan("dev"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(routes);

server.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server running in ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
  );
});


if(){
  //sem condições
  print("Tudo que me dá trabalho, me dá raiva!")

}
