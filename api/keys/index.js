import { readFileSync } from "fs";

export const key = readFileSync("./keys/jwtRS256.key", { encoding: "utf8" });
export const keyPub = readFileSync("./keys/jwtRS256.key.pub", {
  encoding: "utf-16le",
});

export default {
  key,
  keyPub,
};
