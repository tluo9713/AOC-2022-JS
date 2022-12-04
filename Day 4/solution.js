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

// to be honest i think the code i wrote is not too bad already, below is a bit more readable

const convertToRange = (section) => {
    const arr = section.split("-");
    return arr.map((el) => Number(el));
};

const someOverlap = (rangeA, rangeB) => {
    const [aStart, aEnd] = rangeA;
    const [bStart, bEnd] = rangeB;

    // if aStart is between bStart and bEnd, there are overlapping
    if (bStart <= aStart && aStart <= bEnd) return true;
    // if aEnd is between bStart and bEnd, there are overlapping
    if (bStart <= aEnd && aEnd <= bEnd) return true;
    if (aStart <= bStart && bStart <= aEnd) return true;
    if (aStart <= bEnd && bEnd <= aEnd) return true;
    return false;
};

const completeOverlap = (rangeA, rangeB) => {
    const [aStart, aEnd] = rangeA;
    const [bStart, bEnd] = rangeB;

    // if aStart is greater than bStart and aEnd is less than bEnd, a is completely within
    // b
    if (bStart <= aStart && aEnd <= bEnd) return true;
    // vice versa
    if (aStart <= bStart && bEnd <= aEnd) return true;
    return false;
};

let part1Clean = (input) => {
    let res = 0;

    for (let i = 0; i < input.length - 1; i++) {
        let [sectionA, sectionB] = input[i].split(",");
        sectionA = convertToRange(sectionA);
        sectionB = convertToRange(sectionB);

        if (completeOverlap(sectionA, sectionB)) res++;
    }
    return res;
};

let part1SolutionClean = part1Clean(input);
console.log(part1SolutionClean);

let part2Clean = (input) => {
    let res = 0;

    for (let i = 0; i < input.length - 1; i++) {
        let [sectionA, sectionB] = input[i].split(",");
        sectionA = convertToRange(sectionA);
        sectionB = convertToRange(sectionB);

        if (someOverlap(sectionA, sectionB)) res++;
    }
    return res;
};

let part2SolutionClean = part2Clean(input);
console.log(part2SolutionClean);
