import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `addx 15
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
// how ugly it can get and reading is so difficult
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
