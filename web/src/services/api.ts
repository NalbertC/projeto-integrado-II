import axios from "axios";

export const baseUrl = "http://localhost:8000";

export const api = axios.create({
  baseURL: baseUrl,
});

export const createSession = async (email: string, password: string) => {
  const session = api.post("/login", { email, password });

  return session;
};
