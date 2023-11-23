import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const createSession = async (email: string, password: string) => {
  const session = api.post("/login", { email, password });

  return session;
};
