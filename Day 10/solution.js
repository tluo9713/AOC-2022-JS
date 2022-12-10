import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

let sampleInput = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop
`;

// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

// again, initial solutions are saved as is, only removing debugging statements. this is to show
// how ugly it can get and reading the problem is so difficult
let part1 = (input) => {
    let x = 1;
    let res = 0;
    let cycleCount = 0;
    let cycle = new Set([20, 60, 100, 140, 180, 220]);
    for (let i = 0; i < input.length - 1; i++) {
        let el = input[i].split(" ");
        if (el[0] == "addx") {
            cycleCount++;
            if (cycle.has(cycleCount)) {
                res += x * cycleCount;
            }
        }

        cycleCount++;
        if (cycle.has(cycleCount)) {
            res += x * cycleCount;
        }
        if (el[0] == "addx") {
            x += +el[1];
        }
    }
    return res;
};

const part1Solution = part1(input);
console.log(part1Solution);

let part2 = (input) => {
    let x = 1;
    let res = [];
    let cycleCount = 0;
    let curr = "";
    for (let i = 0; i < input.length - 1; i++) {
        let el = input[i].split(" ");
        if (el[0] == "addx") {
            cycleCount++;

            if (
                cycleCount % 40 == x ||
                cycleCount % 40 == x + 1 ||
                cycleCount % 40 == x + 2
            )
                curr += "#";
            else curr += ".";
        }
        if (curr.length == 40) {
            res.push(curr);
            curr = "";
        }
        cycleCount++;
        if (
            cycleCount % 40 == x ||
            cycleCount % 40 == x + 1 ||
            cycleCount % 40 == x + 2
        )
            curr += "#";
        else curr += ".";
        if (curr.length == 40) {
            res.push(curr);
            curr = "";
        }
        if (el[0] == "addx") {
            x += +el[1];
        }
    }
    return res;
};

const part2Solution = part2(input);
for (let i = 0; i < part2Solution.length; i++) console.log(part2Solution[i]);

// i think we should instead have it iterate through cycles and if we need to we read from
// line and do the input. if noop, just continue on
// if do something, wait the appropriate cycle, then perform and clear up action to do

// for part 2, im thinking cyclecount >= x && cyclecount <= x+ size where size = size of pixel-1

const processInstructions = (input, callback) => {
    let x = 1;
    let dict = { noop: 1, addx: 2 };
    for (let inputIdx = 0, cycle = 1; cycle <= 240; inputIdx++) {
        const [instruction, val] = input[inputIdx].split(" ");
        let cyclesToComplete = dict[instruction];

        while (cyclesToComplete) {
            callback(x, cycle);
            cycle++;
            cyclesToComplete--;
        }
        if (instruction == "addx") x += Number(val);
    }
};

let part1Refactor = (input) => {
    let res = 0;
    const importantCycles = new Set([20, 60, 100, 140, 180, 220]);
    // to make this not reliant on a set, we could use (cycle + 20 % 40 == 0) but i find
    // this is less readable

    const addSignalStrength = (x, cycle) => {
        // add only if its at the cycles we're interested in
        if (importantCycles.has(cycle)) res += x * cycle;
    };

    processInstructions(input, addSignalStrength);
    return res;
};

const part1RefactorSolution = part1Refactor(input);
console.log(part1RefactorSolution);

let part2Refactor = (input) => {
    let res = [];
    let curr = "";
    const sizeOfSprite = 3;
    const drawCRT = (x, cycle) => {
        // the size of the CRT is 40, so as cycles exceeds 40, we take the mod to adjust
        cycle = cycle % 40;
        const cycleContainsSprite = cycle >= x && cycle <= x + sizeOfSprite - 1;
        // if cycle contains sprite, we draw with a "#", else "." represents empty
        curr += cycleContainsSprite ? "#" : ".";
        if (curr.length !== 40) return;
        res.push(curr);
        curr = "";
    };

    processInstructions(input, drawCRT);
    return res;
};

const part2RefactorSolution = part2Refactor(input);
for (let i = 0; i < part2RefactorSolution.length; i++)
    console.log(part2RefactorSolution[i]);
