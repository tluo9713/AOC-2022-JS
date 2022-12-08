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
    arr = new Array(input[0].length).fill(-Infinity);
    for (let i = input.length - 2; i >= 0; i--) {
        let el = input[i];
        for (let j = 0; j < el.length; j++) {
            if (!matrix[i][j] && arr[j] < el[j]) matrix[i][j] = true;
            arr[j] = Math.max(el[j], arr[j]);
        }
    }
    arr = new Array(input[0].length).fill(-Infinity);
    for (let i = 0; i < input[0].length; i++) {
        for (let j = 0; j < input.length - 1; j++) {
            if (!matrix[j][i] && arr[j] < input[j][i]) matrix[j][i] = true;
            arr[j] = Math.max(input[j][i], arr[j]);
        }
    }
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
