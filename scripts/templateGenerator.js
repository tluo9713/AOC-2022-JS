import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

const inputData = `import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileName = \`\${__dirname}/input.txt\`;

export default await fs.readFileSync(fileName, "utf8");
`;

const solutionData = `import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = \`\`;
// process raw input
let input = newLineSplitter(sampleInput);
// input = newLineSplitter(rawInput);


let part1 = (input) => {
    let res = 0;
    for (let i = 0; i < input.length - 1; i++) {
        let el = input[i];
    }
    for (let i = 0; i < PLACEHOLDER; i++) {
        
    }
    return res;
};

const part1Solution = part1(input);
console.log(part1Solution);
`;

const day = 6;

try {
    // generate directory
    fs.mkdir(`${__dirname}/Day ${day}`, (err) => err && console.log(err));

    // generate input file
    const inputFileName = `${__dirname}/Day ${day}/input.js`;
    await fs.writeFile(
        inputFileName,
        inputData,
        (err) => err && console.error(err)
    );

    // generate solution file
    const solutionFileName = `${__dirname}/Day ${day}/solution.js`;
    await fs.writeFile(
        solutionFileName,
        solutionData,
        (err) => err && console.error(err)
    );
} catch (error) {
    console.log(error);
}
