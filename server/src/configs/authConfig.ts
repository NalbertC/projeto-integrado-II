import "dotenv/config";

export const authConfig = {
  secret: process.env.API_SECRET,
  expiresIn: "1d",
};
