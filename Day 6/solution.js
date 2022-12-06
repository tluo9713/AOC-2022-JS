import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `bvwbjplbgvbhsrlpgdmjqwftvncz`;
// process raw input
let input = sampleInput;
input = rawInput;

let part1 = (input) => {
    let res = 0;
    for (let i = 3; i < input.length - 1; i++) {
        let a = input[i - 3];
        let b = input[i - 2];
        let c = input[i - 1];
        let d = input[i];
        let set = new Set([a, b, c, d]);
        if (set.size == 4) return i + 1;
    }
    return res;
};

let part2 = (input) => {
    let res = 0;
    for (let i = 3; i < input.length - 1; i++) {
        let set = new Set();
        for (let j = i - 13; j <= i; j++) {
            set.add(input[j]);
        }
        if (set.size == 14) return i + 1;
    }
    return res;
};

const part1Solution = part1(input);
console.log(part1Solution);

const part2Solution = part2(input);
console.log(part2Solution);
