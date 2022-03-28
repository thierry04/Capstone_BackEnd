import "dotenv/config";
import { sign, verify } from "jsonwebtoken";
import { genSalt, hash as _hash, compare } from "bcryptjs";
import { config } from "dotenv";

config();
const { JWT_SECRET } = process.env;

class authentication {
  static async encryptPassword(password) {
    const salt = await genSalt(10);
    const hash = await _hash(password, salt);
    if (!hash) return false;
    return hash;
  }

  static async decryptPassword(password, hash) {
    const isValid = await compare(password, hash);
    if (!isValid) return false;
    return isValid;
  }

  static async signToken({ email }, secret = JWT_SECRET, duration = null) {
    const tokenOptions = duration ? { expiresIn: duration } : undefined;
    const token = sign({ email }, secret, tokenOptions);

    return token;
  }

  static async verifyToken(token, secret = JWT_SECRET) {
    const decoded = verify(token, secret);
    return decoded;
  }
}
export default authentication;
