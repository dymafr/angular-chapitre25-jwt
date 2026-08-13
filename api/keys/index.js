import { readFileSync } from "fs";

export const key = readFileSync("./keys/jwtRS256.key", { encoding: "utf8" });
export const keyPub = readFileSync("./keys/jwtRS256.key.pub", {
  encoding: "utf8",
});

export default {
  key,
  keyPub,
};
