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
    // note i am aware post submission that technically i should update this so i is equal to 13
    // but i guess im fairly lucky this edgecase has no issue on my code
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

// this was fairly straightforward, really nothing significant to change

const checkForUniqueChars = (str) => {
    const set = new Set(str.split(""));
    return set.size == str.length;
};

let part1Clean = (input) => {
    let res = 0;
    for (let i = 3; i < input.length - 1; i++) {
        let str = input.slice(i - 3, i + 1);
        if (checkForUniqueChars(str)) return i + 1;
    }
    return res;
};

let part2Clean = (input) => {
    let res = 0;
    for (let i = 13; i < input.length - 1; i++) {
        let str = input.slice(i - 13, i + 1);
        if (checkForUniqueChars(str)) return i + 1;
    }
    return res;
};

const part1CleanSolution = part1Clean(input);
console.log(part1CleanSolution);

const part2CleanSolution = part2Clean(input);
console.log(part2CleanSolution);
