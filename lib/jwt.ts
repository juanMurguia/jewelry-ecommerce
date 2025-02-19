import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || ""; // fallback secret

export function generate(obj: object) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined!");
  }
  return jwt.sign(obj, JWT_SECRET);
}

export function verify(token: string) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined!");
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    console.error(e, "token incorrecto");
    return null;
  }
}
