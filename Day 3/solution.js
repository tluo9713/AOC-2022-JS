import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

let part1 = (input) => {
    let res = "";

    for (let i = 0; i < input.length - 1; i++) {
        let el = input[i];
        let len = el.length / 2;
        let first = el.slice(0, len);
        let second = el.slice(len);
        // find the same letter
        for (let char of first) {
            if (second.indexOf(char) !== -1) {
                res += char;
                break;
            }
        }
    }
    let val = 0;
    for (let i = 0; i < res.length; i++) {
        let num = res.charCodeAt(i) - 97;
        if (num >= 0) val += num + 1;
        else val += num + 97 - 65 + 27;
    }
    return val;
};

let part2 = (input) => {
    let res = "";

    for (let i = 0; i < input.length - 1; i += 3) {
        let set = new Set(input[i].split(""));
        for (let j = 1; j < 3; j++) {
            let newSet = new Set();
            for (let char of input[i + j]) {
                if (set.has(char)) newSet.add(char);
            }
            set = newSet;
        }
        res += [...set].at(0);
    }
    let val = 0;
    for (let i = 0; i < res.length; i++) {
        let num = res.charCodeAt(i) - 97;
        if (num >= 0) val += num + 1;
        else val += num + 97 - 65 + 27;
    }
    return val;
};

let part1Solution = part1(input);
console.log(part1Solution);

let part2Solution = part2(input);
console.log(part2Solution);
