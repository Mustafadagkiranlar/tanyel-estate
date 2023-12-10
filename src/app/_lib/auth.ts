import { JWTPayload, jwtVerify } from "jose";

export const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return secret;
};

export const verifyAuth = async (token: string) => {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJWTSecret()));
        return verified.payload as JWTPayload;
    } catch (error) {
        throw new Error("Invalid token");
    }
}
