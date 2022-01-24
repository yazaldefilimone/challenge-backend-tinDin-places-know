
import bcrypt from 'bcryptjs';
import JWT, { VerifyCallback } from 'jsonwebtoken';
import { env } from '../../config/env'
export async function hashValue(value: string, salt = 10): Promise<string> {
  return await bcrypt.hash(value, salt);
}

export async function compareValue(value: string, hashedValue: string): Promise<boolean> {
  return await bcrypt.compare(value, hashedValue);
}

export function createJWT(payload: object, expires = '10d') {
  const token = JWT.sign(payload, env.secret_key as string, { expiresIn: expires });
  return token;
}

export function verifyJWT(token: string, callback: VerifyCallback) {
  JWT.verify(token, env.secret_key as string, callback);
}
