import jwt from "jsonwebtoken";

export type AuthTokenPayload = {
  userId: number;
  email: string;
  name?: string | null;
};

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return secret;
};

export const signAuthToken = (payload: AuthTokenPayload) => {
  const expiresIn = (process.env.JWT_EXPIRES_IN ?? "1d") as jwt.SignOptions["expiresIn"];

  return jwt.sign(payload, getJwtSecret(), {
    expiresIn,
  });
};

export const verifyAuthToken = (token: string) => {
  return jwt.verify(token, getJwtSecret()) as AuthTokenPayload;
};
