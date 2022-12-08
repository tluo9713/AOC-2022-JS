import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `30373
25512
65332
33549
35390
`;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

// my first thought in my attempt to do this is to literally search from each direction
// left right up down and keep track of the max height tree. along the way if the current tree
// is larger than anything we've seen before, we'll mark the current row and col as true and after
// marking every possible tree from every direction, we'll count the amount of marked trees
// below it can get confusing keeping track of things. imagine keeping things DRY?
// i clearly just strong armed my way through as i couldnt think of a shorter way ... gross.

// for part 1, its already optimized for time because we're using an arr to keep track of the max
// height we seen in a direction.
let part1 = (input) => {
    let res = 0;
    let matrix = new Array(input.length - 1);
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(input[i].length).fill(false);
    }

    let arr = new Array(input[0].length).fill(-Infinity);
    // top to bottom
    for (let i = 0; i < input.length - 1; i++) {
        let el = input[i];
        for (let j = 0; j < el.length; j++) {
            if (!matrix[i][j] && arr[j] < el[j]) matrix[i][j] = true;
            arr[j] = Math.max(el[j], arr[j]);
        }
    }
    // bottom to top
    arr = new Array(input[0].length).fill(-Infinity);
    for (let i = input.length - 2; i >= 0; i--) {
        let el = input[i];
        for (let j = 0; j < el.length; j++) {
            if (!matrix[i][j] && arr[j] < el[j]) matrix[i][j] = true;
            arr[j] = Math.max(el[j], arr[j]);
        }
    }
    // left to right
    arr = new Array(input[0].length).fill(-Infinity);
    for (let i = 0; i < input[0].length; i++) {
        for (let j = 0; j < input.length - 1; j++) {
            if (!matrix[j][i] && arr[j] < input[j][i]) matrix[j][i] = true;
            arr[j] = Math.max(input[j][i], arr[j]);
        }
    }
    // right to left
    arr = new Array(input[0].length).fill(-Infinity);
    for (let i = input[0].length - 1; i >= 0; i--) {
        for (let j = 0; j < input.length - 1; j++) {
            if (!matrix[j][i] && arr[j] < input[j][i]) matrix[j][i] = true;
            arr[j] = Math.max(input[j][i], arr[j]);
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j]) res++;
        }
    }

    return res;
};

const part1Solution = part1(input);
console.log(part1Solution);

// plan for part 2 is to scrap everything we did in part 1, and just dfs looking for
// the amount of trees you can see from every direction, and grab the max one
const dfs = (matrix, row, col, dirRow, dirCol, val) => {
    let rowLimit = matrix.length - 1;
    let colLimit = matrix[0].length;
    if (row < 0 || row == rowLimit) return 0;
    if (col < 0 || col == colLimit) return 0;
    if (matrix[row][col] >= val) return 1;
    return 1 + dfs(matrix, row + dirRow, col + dirCol, dirRow, dirCol, val);
};

const getScenicScore = (matrix, i, j) => {
    let dir = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];
    let arr = [];
    for (let [rowDir, colDir] of dir) {
        let val = dfs(
            matrix,
            i + rowDir,
            j + colDir,
            rowDir,
            colDir,
            matrix[i][j]
        );
        arr.push(val);
    }
    let res = 1;
    for (let i = 0; i < arr.length; i++) {
        res *= arr[i];
    }
    return res;
};

let part2 = (input) => {
    let res = 0;
    for (let i = 0; i < input.length - 1; i++) {
        for (let j = 0; j < input[0].length; j++) {
            res = Math.max(getScenicScore(input, i, j), res);
        }
    }
    return res;
};

const part2Solution = part2(input);
console.log(part2Solution);

// honestly the optimized solution, while they work, im not confident its a great approach,
// because the main function is more intuitive for part 2, and less so far part 1. but
// technically it works.

// what makes part 2 initial solution slower is that we have to dfs from every spot in which
// case we may examine the same elements multiple times possibly making it a O(n^2) time
// complexity?
// below we use an monotonic stack for each direction that way we dont really examine the same
// element repeatedly and pop out what we don't need to know anymore. read below for the logic
const ROW_LIMIT = input.length - 1;
const COL_LIMIT = input[0].length;

const createMask = () => {
    let matrix = new Array(ROW_LIMIT);
    for (let row = 0; row < ROW_LIMIT; row++)
        matrix[row] = new Array(COL_LIMIT).fill(0);

    return matrix;
};

const createMonotonicStack = (length) => {
    const monotonicStack = [];
    for (let i = 0; i < length; i++) monotonicStack.push([]);
    return monotonicStack;
};

const createDirectionalMasks = (input) => {
    const topToBotMask = checkTopToBottom(input);
    const botToTopMask = checkBottomToTop(input);
    const leftToRightMask = checkLeftToRight(input);
    const rightToLeftMask = checkRightToLeft(input);
    return [topToBotMask, botToTopMask, leftToRightMask, rightToLeftMask];
};

const checkTopToBottom = (input) => {
    const monotonicStack = createMonotonicStack(ROW_LIMIT);
    const mask = createMask(input);

    // to explain the logic, first know that the monotonic stack keeps track of the tallest
    // trees INDEX
    // lets also talk about only col 0 to simplify things
    // as we move down the rows of col 0, we check our stack, is the current tree taller than
    // that at the end of the stack? if so, we pop that index out until we can't anymore.
    // now we check how many trees it can see by checking the element in the stack (if it exists)
    // and subtract that distance from current position and thats how many trees we see. if there
    // are no elements in the stack, we can see to the edge so we just need to subtract the distance
    // from current position to edge. and then we store current index in that stack always.
    // from here we just extend that logic towards the rest of the cols. the logic applies to
    // the rest of the functions
    for (let row = 0; row < ROW_LIMIT; row++) {
        for (let col = 0; col < COL_LIMIT; col++) {
            const currHeight = input[row][col];
            // pop while there are elements in the stack at that col, and if the last element
            // in that stack is shorter than current height
            while (
                monotonicStack[col].length &&
                input[monotonicStack[col].at(-1)][col] < currHeight
            ) {
                monotonicStack[col].pop();
            }
            let furthest = monotonicStack[col].length
                ? monotonicStack[col].at(-1)
                : 0;
            mask[row][col] = row - furthest;
            monotonicStack[col].push(row);
        }
    }
    return mask;
};

const checkBottomToTop = (input) => {
    const monotonicStack = createMonotonicStack(ROW_LIMIT);
    const mask = createMask(input);

    for (let row = ROW_LIMIT - 1; row >= 0; row--) {
        for (let col = 0; col < COL_LIMIT; col++) {
            const currHeight = input[row][col];
            while (
                monotonicStack[col].length &&
                input[monotonicStack[col].at(-1)][col] < currHeight
            ) {
                monotonicStack[col].pop();
            }
            let furthest = monotonicStack[col].length
                ? monotonicStack[col].at(-1)
                : input.length - 2;
            mask[row][col] = furthest - row;
            monotonicStack[col].push(row);
        }
    }
    return mask;
};

const checkLeftToRight = (input) => {
    const monotonicStack = createMonotonicStack(COL_LIMIT);
    const mask = createMask(input);

    for (let col = 0; col < COL_LIMIT; col++) {
        for (let row = 0; row < ROW_LIMIT; row++) {
            const currHeight = input[row][col];
            while (
                monotonicStack[row].length &&
                input[row][monotonicStack[row].at(-1)] < currHeight
            ) {
                monotonicStack[row].pop();
            }
            let furthest = monotonicStack[row].length
                ? monotonicStack[row].at(-1)
                : 0;
            mask[row][col] = col - furthest;
            monotonicStack[row].push(col);
        }
    }
    return mask;
};

const checkRightToLeft = (input) => {
    const monotonicStack = createMonotonicStack(COL_LIMIT);
    const mask = createMask(input);

    for (let col = COL_LIMIT - 1; col >= 0; col--) {
        for (let row = 0; row < ROW_LIMIT; row++) {
            const currHeight = input[row][col];
            while (
                monotonicStack[row].length &&
                input[row][monotonicStack[row].at(-1)] < currHeight
            ) {
                monotonicStack[row].pop();
            }
            let furthest = monotonicStack[row].length
                ? monotonicStack[row].at(-1)
                : input[0].length - 1;
            mask[row][col] = furthest - col;
            monotonicStack[row].push(col);
        }
    }
    return mask;
};

const visibleFromOutside = (input, row, col, masks) => {
    // returns true if tree at row, col can be seen from the outside
    // if tree is on the edge, we just return true
    const rowLimit = input.length - 2;
    const colLimit = input[0].length - 1;
    if (row == 0 || row == rowLimit || col == 0 || col == colLimit) return true;
    const [topToBotMask, botToTopMask, leftToRightMask, rightToLeftMask] =
        masks;

    // if the current tree can see as many trees as there are until the edge, and see past
    // the tree on the edge. this is to prevent the edge case where we can see the tree
    // at the edge, but not past it
    const topTreesSeen = topToBotMask[row][col];
    const canSeePastTopTree = input[row][col] > input[0][col];
    if (topTreesSeen == row && canSeePastTopTree) return true;

    const botTreesSeen = botToTopMask[row][col];
    const canSeePastBotTree = input[row][col] > input[rowLimit][col];
    if (botTreesSeen == rowLimit - row && canSeePastBotTree) return true;

    const leftTreesSeen = leftToRightMask[row][col];
    const canSeePastLeftTree = input[row][col] > input[row][0];
    if (leftTreesSeen == col && canSeePastLeftTree) return true;

    const rightTreesSeen = rightToLeftMask[row][col];
    const canSeePastRightTree = input[row][col] > input[row][colLimit];
    if (rightTreesSeen == colLimit - col && canSeePastRightTree) return true;

    return false;
};

let part1Optimized = (input) => {
    let res = 0;

    const masks = createDirectionalMasks(input);
    for (let row = 0; row < ROW_LIMIT; row++) {
        for (let col = 0; col < COL_LIMIT; col++) {
            if (visibleFromOutside(input, row, col, masks)) res++;
        }
    }

    return res;
};

const part1OptimizedSolution = part1Optimized(input);
console.log(part1OptimizedSolution);

const getScenicScoreOptimize = (row, col, masks) => {
    const [topToBotMask, botToTopMask, leftToRightMask, rightToLeftMask] =
        masks;

    const top = topToBotMask[row][col];
    const bot = botToTopMask[row][col];
    const left = leftToRightMask[row][col];
    const right = rightToLeftMask[row][col];
    return top * bot * left * right;
};

const part2Optimized = (input) => {
    let res = 0;
    const masks = createDirectionalMasks(input);
    for (let row = 0; row < ROW_LIMIT; row++) {
        for (let col = 0; col < COL_LIMIT; col++) {
            const score = getScenicScoreOptimize(row, col, masks);
            res = Math.max(res, score);
        }
    }

    return res;
};

const part2OptimizedSolution = part2Optimized(input);
console.log(part2OptimizedSolution);
