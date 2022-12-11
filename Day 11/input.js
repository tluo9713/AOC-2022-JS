import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileName = `${__dirname}/input.txt`;

export default await fs.readFileSync(fileName, "utf8");
