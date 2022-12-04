import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

let part1 = (input) => {
    let res = 0;

    for (let i = 0; i < input.length - 1; i++) {
        let [sectionA, sectionB] = input[i].split(",");
        let [aStart, aEnd] = sectionA.split("-");
        let [bStart, bEnd] = sectionB.split("-");
        if (+bStart <= +aStart && +aEnd <= +bEnd) {
            res++;
            continue;
        }
        if (+aStart <= +bStart && +bEnd <= +aEnd) {
            res++;
        }
    }
    return res;
};

let part2 = (input) => {
    let res = 0;

    for (let i = 0; i < input.length - 1; i++) {
        let [sectionA, sectionB] = input[i].split(",");
        let [aStart, aEnd] = sectionA.split("-");
        let [bStart, bEnd] = sectionB.split("-");
        if (+bStart <= +aStart && +aStart <= bEnd) {
            res++;
        } else if (+aStart <= bStart && +bStart <= aEnd) {
            res++;
        } else if (+bStart <= +aEnd && +aEnd <= bEnd) {
            res++;
        } else if (+aStart <= bEnd && +bEnd <= aEnd) {
            res++;
        }
    }
    return res;
};

let part1Solution = part1(input);
console.log(part1Solution);

let part2Solution = part2(input);
console.log(part2Solution);
