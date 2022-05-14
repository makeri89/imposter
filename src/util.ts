import * as fs from "fs";

export const reader = (filename: string) => {
  return fs.readFileSync(filename, "utf8");
};
