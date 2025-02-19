import type { NextApiRequest, NextApiResponse } from "next";
import { verify } from "./jwt";
import parseBearerToken from "parse-bearer-token";

async function authMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  callback
) {
  const token = parseBearerToken(req);

  if (!token) {
    console.error("❌ No token provided");
    res.status(401).json({ message: "Unauthorized: No token" });
    return;
  }

  try {
    const decodedToken = verify(token);
    if (!decodedToken) {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
      return;
    }

    const userData = await callback(decodedToken);

    return userData;
  } catch (error) {
    console.error("❌ Error verificando el token:", error);
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    return;
  }
}

export { authMiddleware };
