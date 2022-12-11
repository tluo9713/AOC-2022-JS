import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = ``;
// process raw input
let input = newLineSplitter(sampleInput);
// input = newLineSplitter(rawInput);

let part1 = (input) => {
    let res = 0;
    for (let i = 0; i < input.length - 1; i++) {
        let el = input[i];
    }
    for (let i = 0; i < PLACEHOLDER; i++) {}
    return res;
};

const part1Solution = part1(input);
console.log(part1Solution);

// const part2Solution = part2(input);
// console.log(part2Solution);
