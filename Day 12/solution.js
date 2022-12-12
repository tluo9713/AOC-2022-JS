import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

// another ugly implementation. i had an idea of wha i wanted to do, but im just really
// slow at typing i guess, lots of variables and jank included for my initial solution
let part1 = (input) => {
    let res = 0;
    let startRow;
    let startCol;
    let endRow;
    let endCol;
    for (let i = 0; i < input.length - 1; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (input[i][j] == "S") {
                startRow = i;
                startCol = j;
            }
            if (input[i][j] == "E") {
                endRow = i;
                endCol = j;
            }
        }
    }
    let seen = new Set();
    // bfs
    let queue = [[startRow, startCol, 0, []]];
    while (queue.length) {
        let [row, col, steps, thing, prev] = queue.shift();
        let rowLimit = input.length - 1;
        let colLimit = input[0].length;
        if (row < 0 || row == rowLimit || col < 0 || col == colLimit) continue;
        let str = `${row},${col}`;
        let org = input[row][col];
        let char = org;
        if (char == "E") char = "z";
        if (char !== "S" && char.charCodeAt(0) - prev.charCodeAt(0) > 1)
            continue;
        if (seen.has(str)) continue;
        seen.add(str);

        // check

        if (org == "E") {
            // for (let i = 0; i < thing.length; i++) console.log(thing[i]);
            // console.log(char, prev, char.charCodeAt(0) - prev.charCodeAt(0));
            return steps;
        }
        if (char == "S") char = "a";
        steps++;
        queue.push([row - 1, col, steps, [...thing, [row, col]], char]);
        queue.push([row + 1, col, steps, [...thing, [row, col]], char]);
        queue.push([row, col - 1, steps, [...thing, [row, col]], char]);
        queue.push([row, col + 1, steps, [...thing, [row, col]], char]);
    }
    return res;
};

const part1Solution = part1(input);
console.log(part1Solution);

let part2 = (input) => {
    let res = 0;
    let startRow;
    let startCol;
    let endRow;
    let endCol;
    let queue = [];

    for (let i = 0; i < input.length - 1; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (input[i][j] == "S" || input[i][j] == "a") {
                queue.push([i, j, 0, []]);
            }
        }
    }
    let seen = new Set();
    // bfs
    while (queue.length) {
        let [row, col, steps, thing, prev] = queue.shift();
        let rowLimit = input.length - 1;
        let colLimit = input[0].length;
        if (row < 0 || row == rowLimit || col < 0 || col == colLimit) continue;
        let str = `${row},${col}`;
        let org = input[row][col];
        let char = org;
        if (char == "E") char = "z";
        if (!"Sa".includes(char) && char.charCodeAt(0) - prev.charCodeAt(0) > 1)
            continue;
        if (seen.has(str)) continue;
        seen.add(str);

        // check

        if (org == "E") {
            // for (let i = 0; i < thing.length; i++) console.log(thing[i]);
            // console.log(char, prev, char.charCodeAt(0) - prev.charCodeAt(0));
            return steps;
        }
        if (char == "S") char = "a";
        steps++;
        queue.push([row - 1, col, steps, [...thing, [row, col]], char]);
        queue.push([row + 1, col, steps, [...thing, [row, col]], char]);
        queue.push([row, col - 1, steps, [...thing, [row, col]], char]);
        queue.push([row, col + 1, steps, [...thing, [row, col]], char]);
    }
    return res;
};
const part2Solution = part2(input);
console.log(part2Solution);

// refactoring, have a separate bfs function and the part 1 and 2 just past in initial conditons
//

const canTraverse = (prev, curr) => {
    if (curr == "S") curr = "a";
    if (curr == "E") curr = "z";
    const prevElevation = prev.charCodeAt(0);
    const currElevation = curr.charCodeAt(0);
    return currElevation - prevElevation <= 1;
};

const bfs = (queue) => {
    const seen = new Set();

    while (queue.length) {
        let [row, col, steps, prev] = queue.shift();
        // if row or col is out of bounds, we skip
        if (row < 0 || row == rowLimit || col < 0 || col == colLimit) continue;
        // if we can't traverse, we skip
        let char = input[row][col];
        if (!canTraverse(prev, char)) continue;
        // if we seen this row and col, then we reached this location before, meaning the previous time we
        // seen this spot, it will be either equal steps or less steps than current, no need to evaluate so we
        // can skip
        let str = `${row},${col}`;
        if (seen.has(str)) continue;
        seen.add(str);

        if (char == "E") return steps;
        if (char == "S") char = "a";
        steps++;
        queue.push([row - 1, col, steps, char]);
        queue.push([row + 1, col, steps, char]);
        queue.push([row, col - 1, steps, char]);
        queue.push([row, col + 1, steps, char]);
    }
    throw Error("We searched every possible path but could not reach Z");
};

const rowLimit = input.length - 1;
const colLimit = input[0].length;

const searchForStart = (input, startChars) => {
    const queue = [];
    for (let row = 0; row < input.length - 1; row++) {
        for (let col = 0; col < input[0].length; col++) {
            let char = input[row][col];
            if (startChars.has(char)) {
                if (char == "S") char = "a";
                queue.push([row, col, 0, char]);
            }
        }
    }
    return queue;
};
let part1Refactor = (input) => {
    const startChars = new Set(["S"]);
    const queue = searchForStart(input, startChars);
    return bfs(queue);
};

const part1RefactorSolution = part1Refactor(input);
console.log(part1RefactorSolution);

let part2Refactor = (input) => {
    const startChars = new Set("Sa".split(""));
    const queue = searchForStart(input, startChars);
    return bfs(queue);
};

const part2RefactorSolution = part2Refactor(input);
console.log(part2RefactorSolution);
