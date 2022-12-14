import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

// let minX = 500 - 11;
// let maxX = 500 + 11;
// let minX = 494;
// let maxX = 503;
// let minY = 0;
// let maxY = 9;

// let minX = 440;
// let maxX = 521;
// let minY = 0;
// let maxY = 169;
// part 2
let minX = 500 - 179;
let maxX = 500 + 179;
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
    let [aX, aY] = a;
    let [bX, bY] = b;

    // because a and b have no particular order, we need to find which is the start
    // and end coordinate to draw properly
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
    // returns true if the sand settled, returns false if the sand has fallen out of bounds
    // or is blocked at source
    let fallX = 500 - minX;
    let fallY = 0;
    if (matrix[fallY][fallX] == "O") return false;
    let falling = true;
    while (falling) {
        // if this is undefined this means we're out of bounds, in which case
        // the sand will fall indefinitely anyway, the sand dropping is complete
        // whenever we check if a value is falsey its for the same reason
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
        // if we got to this point, there is no more spots for our little sand to fall
        // our sand will rest here
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
// could abstract the creation of the matrix
// the parsing of data
// prob use local variable for matrix dimensions, make a function for that

const drawRefactor = (matrix, a, b, minX, minY) => {
    // draws in our matrix from a to b represented with #
    // this keeps offset in mind using minxX and minY
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

const getDimensions = (input) => {
    // gets max and min dimensions of x and y so we only draw what we need
    // and wont get extraneous data in our matrix
    const minY = 0;
    let minX = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < input.length - 1; i++) {
        let line = input[i].split(" -> ");
        for (let el of line) {
            let [x, y] = el.split(",");
            x = +x;
            y = +y;
            maxX = Math.max(x, maxX);
            maxY = Math.max(y, maxY);
            minX = Math.min(x, minX);
        }
    }
    return [minX, maxX, minY, maxY];
};

const sandDropRefactor = (matrix, minX) => {
    // drops sand which will be drawn into our matrix, and returns true if the sand was
    // able to settle aka we are not done yet, or false where we are done dropping sand. as in
    // dropping any more sand will not result in a changed state
    let x = 500 - minX;
    let y = 0;
    if (matrix[y][x] == "O") return false;
    let falling = true;
    while (falling) {
        if (!matrix[y + 1]) return false;

        let below = matrix[y + 1][x];
        if (below == ".") {
            y++;
            continue;
        }

        let bottomLeft = matrix[y + 1][x - 1];
        if (!bottomLeft) return false;
        if (bottomLeft == ".") {
            x--;
            y++;
            continue;
        }

        const bottomRight = matrix[y + 1][x + 1];
        if (!bottomRight) return false;
        if (bottomRight == ".") {
            x++;
            y++;
            continue;
        }

        falling = false;
        matrix[y][x] = "O";
    }
    return true;
};

const createMatrix = (row, col) => {
    // creates matrix and fills with .
    const matrix = new Array(row);
    for (let i = 0; i < matrix.length; i++)
        matrix[i] = new Array(col).fill(".");
    return matrix;
};

const parseInput = (input, matrix, minX, minY) => {
    // parses input to draw on matrix
    for (let i = 0; i < input.length - 1; i++) {
        let line = input[i].split(" -> ");
        let prev;
        for (let el of line) {
            let [x, y] = el.split(",");
            (x = Number(x)), (y = Number(y));

            if (prev) drawRefactor(matrix, prev, [x, y], minX, minY);
            prev = [x, y];
        }
    }
};

let part1Refactor = (input) => {
    let res = 0;
    // to not draw more than needed, we just need the min and max x/y values and we'll
    // construct an matrix out of that
    const [minX, maxX, minY, maxY] = getDimensions(input);
    // create the smallest matrix that will display our solution
    const row = maxY - minY + 1;
    const col = maxX - minX + 1;
    const matrix = createMatrix(row, col);
    parseInput(input, matrix, minX, minY);

    while (sandDropRefactor(matrix, minX)) res++;
    return res;
};

const part1RefactorSolution = part1Refactor(input);
console.log(part1RefactorSolution);

let part2Refactor = (input) => {
    let res = 0;
    let [_a, _b, minY, maxY] = getDimensions(input);
    // we take advantage of the fact that the shape the sand will take as it falls forms a
    // triangle, and it just so happens that the furthest we need to form such a triangle
    // is from the source (which is at 500) the height from top to bottom, which would be 0 to
    // maxY. but we also are adding two additional rows, so thats why we must add 2 to maxY
    // alternatively, we can use 0 to 1000, but it gets really hard to see the matrix.
    const minX = 500 - (maxY + 2);
    const maxX = 500 + (maxY + 2);
    const row = maxY - minY + 1;
    const col = maxX - minX + 1;
    const matrix = createMatrix(row, col);
    // according to problem we need to expand the bottom two rows accordingly
    matrix.push(new Array(col).fill("."));
    matrix.push(new Array(col).fill("#"));

    parseInput(input, matrix, minX, minY);

    while (sandDropRefactor(matrix, minX)) res++;
    return res;
};

const part2RefactorSolution = part2Refactor(input);
console.log(part2RefactorSolution);
