import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000

`;
// process raw input
// let input = newLineSplitter(sampleInput);
let input = newLineSplitter(rawInput);

let part1 = (input) => {
    let max = 0;
    let local = 0;
    for (let i = 0; i < input.length; i++) {
        let el = +input[i];
        if (el) local += el;
        else local = 0;
        max = Math.max(max, local);
    }

    return max;
};

let part1Solution = part1(input);
console.log(part1Solution);

let part2 = (input) => {
    let max = [];
    let local = 0;
    for (let i = 0; i < input.length; i++) {
        let el = +input[i];
        if (el) local += el;
        else {
            max.push(local);
            max.sort((a, b) => b - a);
            if (max.length > 3) max.pop();
            local = 0;
        }
    }
    let res = 0;
    for (let num of max) {
        res += num;
    }
    return res;
};

let part2Solution = part2(input);
console.log(part2Solution);
