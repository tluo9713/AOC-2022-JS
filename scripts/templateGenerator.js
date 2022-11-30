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
// let input = newLineSplitter(rawInput);

// for (let i = 0; i < input.length; i++) {

// }

// input = input.map((el, idx)=> {

// })

let part1 = (input) => {
    return input;
};

let part1Solution = part1(input);
console.log(part1Solution);

let part2 = (input) => {
    return input;
};

let part2Solution = part2(input);
// console.log(part2Solution);
`;

const day = 3;

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
