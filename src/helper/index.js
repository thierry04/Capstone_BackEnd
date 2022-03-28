import authentication from "./auth";

const { encryptPassword, decryptPassword, signToken, verifyToken } =
  authentication;

export { encryptPassword, decryptPassword, signToken, verifyToken };
