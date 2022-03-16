import "dotenv/config";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";

config();
const { TOKEN_SECRET } = process.env;


    export const verifyToken = async(token, secret = TOKEN_SECRET)=> {
        const decoded = verify(token, secret);
        return decoded;
    };