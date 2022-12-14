import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

// let minX = 488;
// let maxX = 512;
// let minY = 0;
// let maxY = 9;

// let minX = 440;
// let maxX = 521;
// let minY = 0;
// let maxY = 169;
// did we try ?
// tried 29204 , 1625
// part 2
let minX = 440 - 179;
let maxX = 521 + 179;
let minY = 0;
let maxY = 169;
// sample
// 503 9
// 494 4
// actual
//440 16
//521 169

// honestly this was a miserable time and i got bodied by the two true algods.
// nothing special here, just literally try to code it as is.
const draw = (matrix, a, b) => {
    // console.log("drawing from ", a, b);
    let [aX, aY] = a;
    let [bX, bY] = b;

    let startX = Math.min(aX, bX);
    let endX = Math.max(aX, bX);
    let startY = Math.min(aY, bY);
    let endY = Math.max(aY, bY);

    if (startX == endX) {
        for (let i = startY - minY; i <= endY - minY; i++) {
            matrix[i][startX - minX] = "#";
        }
    }
    if (startY == endY) {
        for (let i = startX - minX; i <= endX - minX; i++) {
            matrix[startY - minY][i] = "#";
        }
    }
};

const sandDrop = (matrix) => {
    let fallX = 500 - minX;
    let fallY = 0;
    if (matrix[fallY][fallX] == "O") {
        console.log("we finally did it");
        return false;
    }
    let falling = true;
    while (falling) {
        if (!matrix[fallY + 1]) {
            return false;
        }
        let below = matrix[fallY + 1][fallX];
        if (below == ".") {
            fallY++;
            continue;
        }
        if (!matrix[fallY + 1][fallX - 1]) {
            return false;
        }
        let bottomLeft = matrix[fallY + 1][fallX - 1];
        if (bottomLeft == ".") {
            fallX--;
            fallY++;
            continue;
        }
        if (!matrix[fallY + 1][fallX + 1]) {
            return false;
        }
        let bottomRight = matrix[fallY + 1][fallX + 1];
        if (bottomRight == ".") {
            fallX++;
            fallY++;
            continue;
        }
        falling = false;
        matrix[fallY][fallX] = "O";
    }
    return true;
};

let part1 = (input) => {
    let res = 0;

    let matrix = new Array(maxY - minY + 1);
    for (let i = 0; i < matrix.length; i++)
        matrix[i] = new Array(maxX - minX + 1).fill(".");
    // this was to get the max and min values so we could do some math and figure out the smallest array we can make
    // of the sample (and on the actual input)
    // let maxX = -Infinity;
    // let maxY = -Infinity;
    // let minX = Infinity;
    // let minY = Infinity;
    // console.log(maxX, maxY);
    // console.log(minX, minY);

    // console.log(matrix);
    for (let i = 0; i < input.length - 1; i++) {
        let line = input[i].split(" -> ");
        let prev;
        for (let el of line) {
            let [x, y] = el.split(",");
            x = +x;
            y = +y;
            // maxX = Math.max(x, maxX);
            // maxY = Math.max(y, maxY);
            // minX = Math.min(x, minX);
            // minY = Math.min(y, minY);
            // draw the line
            if (prev) draw(matrix, prev, [x, y]);
            prev = [x, y];
        }
    }
    while (sandDrop(matrix)) res++;
    return res;
};

const part1Solution = part1(input);
console.log(part1Solution);

let part2 = (input) => {
    let res = 0;

    let matrix = new Array(maxY - minY + 2);
    for (let i = 0; i < matrix.length; i++)
        matrix[i] = new Array(maxX - minX + 1).fill(".");
    // fill that bottom line
    matrix.push(new Array(maxX - minX + 1).fill("#"));

    for (let i = 0; i < input.length - 1; i++) {
        let line = input[i].split(" -> ");
        let prev;
        for (let el of line) {
            let [x, y] = el.split(",");
            x = +x;
            y = +y;
            if (prev) draw(matrix, prev, [x, y]);
            prev = [x, y];
        }
    }
    while (sandDrop(matrix)) res++;

    return res;
};
const part2Solution = part2(input);
console.log(part2Solution);

// unsure how far i will go for refactor. this was already a pain.
