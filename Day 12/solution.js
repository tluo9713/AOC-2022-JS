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
