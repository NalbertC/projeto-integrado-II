import bcript from "bcryptjs";

export const encriptPassword = async (pass: string) => {
  return bcript.hash(pass, 8);
};

export const comparePassword = async (pass: string, hash: string) => {
  return bcript.compare(pass, hash);
};

