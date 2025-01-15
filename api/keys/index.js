import { readFileSync } from "fs";

export const key = readFileSync("./keys/jwtRS256.key");
export const keyPub = readFileSync("./keys/jwtRS256.key.pub");
