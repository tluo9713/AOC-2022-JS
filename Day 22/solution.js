import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `        ...#    
        .#..    
        #...    
        ....    
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5
`;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

// will probably not refactor this, mostly because im not sure how
// to do part 2 more elegantly. i personally mapped out where the
// wrap arounds would be. i normally would be okay with that, but
// the example and my input are differently shaped dice and its
// not immediately clear to me how i would do those wrap arounds
// so thats about it. i think the logic is pretty easy to follow
// until you get to part 2 with the wrap arounds, that i literally
// created a paper cube and folded it to help me understand visually
// what goes where. if you dont understand it, im sorry.

const changeDir = (initial, rotation) => {
    const dir = ["U", "R", "D", "L"];
    let dirIdx = dir.indexOf(initial);
    dirIdx += rotation == "L" ? -1 : 1;
    if (dirIdx < 0) dirIdx += dir.length;
    if (dirIdx == dir.length) dirIdx %= dir.length;
    const finalDir = dir[dirIdx];
    return finalDir;
};

const getNextPos = (matrix, position, dir) => {
    const obj = {
        U: [-1, 0],
        R: [0, 1],
        D: [1, 0],
        L: [0, -1],
    };
    let [row, col] = position;
    let [rowDir, colDir] = obj[dir];
    let nextRow = row + rowDir;
    let nextCol = col + colDir;
    if (dir == "U" && (!matrix[nextRow] || matrix[nextRow][nextCol] == " ")) {
        // we went out of bounds, start from bottom
        for (let i = matrix.length - 1; i >= 0; i--) {
            if (matrix[i][nextCol] != " ") {
                nextRow = i;
                break;
            }
        }
    } else if (
        dir == "R" &&
        (!matrix[nextRow][nextCol] || matrix[nextRow][nextCol] == " ")
    ) {
        // we went out of bounds, start from left
        for (let i = 0; i < matrix[nextRow].length; i++) {
            if (matrix[nextRow][i] != " ") {
                nextCol = i;
                break;
            }
        }
    } else if (
        dir == "D" &&
        (!matrix[nextRow] || matrix[nextRow][nextCol] == " ")
    ) {
        // we went out of bounds, start from top
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i][nextCol] != " ") {
                nextRow = i;
                break;
            }
        }
    } else if (
        dir == "L" &&
        (!matrix[nextRow][nextCol] || matrix[nextRow][nextCol] == " ")
    ) {
        // we went out of bounds, start from right
        for (let i = matrix[nextRow].length - 1; i >= 0; i--) {
            if (matrix[nextRow][i] != " ") {
                nextCol = i;
                break;
            }
        }
    }

    return [nextRow, nextCol];
};

const move = (matrix, position, dir, steps) => {
    const obj = {
        U: "^",
        R: ">",
        D: "v",
        L: "<",
    };
    while (steps) {
        // get next position
        let [row, col] = position;
        let nextPosition = getNextPos(matrix, position, dir);
        let [nextRow, nextCol, nextDir] = nextPosition;
        let space = matrix[nextRow][nextCol];
        if (space == "#") return;
        matrix[row][col] = obj[dir];
        if (nextDir) dir = nextDir;
        position[0] = nextRow;
        position[1] = nextCol;
        steps--;
    }
};

let part1 = (input) => {
    let matrix = [];
    let max = input[0].length;
    for (let i = 0; i < input.length - 3; i++) {
        let el = input[i].padEnd(max, " ").split("");
        matrix.push(el);
    }
    const instructions = input.at(-2);
    let position = [0, matrix[0].indexOf(".")];
    let dir = "R";

    for (let i = 0; i < instructions.length; i++) {
        // get number
        let el = instructions[i];
        if (!Number.isNaN(+el)) {
            while (
                i + 1 < instructions.length &&
                !Number.isNaN(+instructions[i + 1])
            ) {
                el += instructions[i + 1];
                i++;
            }
            el = +el;
            // simulate moving
            move(matrix, position, dir, el);
        } else {
            // rotate based on what it says
            dir = changeDir(dir, el);
        }
    }
    let [row, col] = position;
    const dirValue = { R: 0, D: 1, L: 2, U: 3 };
    return 1000 * (row + 1) + 4 * (col + 1) + dirValue[dir];
};

const part1Solution = part1(input);
console.log(part1Solution);

const getSection = (position) => {
    let [row, col] = position;
    let section;

    if (row < 50 && col >= 50 && col < 100) section = 1;
    else if (row < 50 && col >= 100) section = 2;
    else if (row >= 50 && row < 100) section = 3;
    else if (row >= 100 && row < 150 && col < 50) section = 5;
    else if (row >= 100 && row < 150 && col >= 50) section = 4;
    else if (row >= 150) section = 6;

    // if (row < 4) section = 1;
    // else if (row < 8 && col < 4) section = 2;
    // else if (row < 8 && col < 8) section = 3;
    // else if (row < 8) section = 4;
    // else if (col < 12) section = 5;
    // else if (row >= 150) section = 6;
    return section;
};
const printMatrix = (matrix) => {
    for (let i = 0; i < matrix.length; i++) console.log(i, matrix[i].join(""));
};

const getNextPos2 = (matrix, position, dir) => {
    const obj = {
        U: [-1, 0],
        R: [0, 1],
        D: [1, 0],
        L: [0, -1],
    };
    let [row, col] = position;
    let [rowDir, colDir] = obj[dir];
    let nextRow = row + rowDir;
    let nextCol = col + colDir;
    // lets find out which section we're in
    let section = getSection(position);

    //checks out
    if (row < 50 && col < 100) section = 1;
    else if (row < 50 && col >= 100) section = 2;
    else if (row >= 50 && row < 100) section = 3;
    else if (row < 150 && col < 50) section = 5;
    else if (row < 150 && col >= 50) section = 4;
    else if (row >= 150) section = 6;

    // i LITERALLY just did a bunch of if statements to map
    // wrap arounds, and what sucked was one of them was wrong
    // and because of that i had a hard time trouble shooting
    // below is for example

    // if (row < 4) section = 1;
    // else if (row < 8 && col < 4) section = 2;
    // else if (row < 8 && col < 8) section = 3;
    // else if (row < 8) section = 4;
    // else if (col < 12) section = 5;
    // else if (row >= 150) section = 6;

    // if (dir == "U" && (!matrix[nextRow] || matrix[nextRow][nextCol] == " ")) {
    //     // console.log(row, col, rowDir, colDir, nextRow, nextCol, dir);
    //     // we went out of bounds, start from bottom
    //     if (section == 1) {
    //         nextRow = 4;
    //         nextCol = 3 - (col - 8);
    //         dir = "D";
    //     } else if (section == 2) {
    //         nextRow = 0;
    //         nextCol = 11 - col;
    //         dir = "D";
    //     } else if (section == 3) {
    //         nextRow = col - 4;
    //         nextCol = 8;
    //         dir = "R";
    //     } else if (section == 6) {
    //         nextRow = 7 - (col - 12);
    //         nextCol = 11;
    //         dir = "L";
    //     } else {
    //         console.log("SOMETHING IS WRONNNNNNNNNNNNNNNNNNNNNNG");
    //     }
    //     // console.log(
    //     //     "WE ARE GOING FROM",
    //     //     row,
    //     //     col,
    //     //     "TO ",
    //     //     nextRow,
    //     //     nextCol,
    //     //     "DIR",
    //     //     startDir,
    //     //     " to",
    //     //     dir
    //     // );
    //     // console.log("+++++++++++++++++++++++++++++++++++++++++++++");
    // } else if (
    //     dir == "R" &&
    //     (!matrix[nextRow][nextCol] || matrix[nextRow][nextCol] == " ")
    // ) {
    //     if (section == 1) {
    //         nextRow = 11 - row;
    //         nextCol = 15;
    //         dir = "L";
    //     } else if (section == 4) {
    //         nextRow = 8;
    //         nextCol = 15 - (row - 4);
    //         dir = "D";
    //     } else if (section == 6) {
    //         nextRow = 3 - (row - 8);
    //         nextCol = 11;
    //         dir = "L";
    //     } else {
    //         console.log("SOMETHING IS WRONNNNNNNNNNNNNNNNNNNNNNG");
    //     }
    //     // console.log(
    //     //     "WE ARE GOING FROM",
    //     //     row,
    //     //     col,
    //     //     "TO ",
    //     //     nextRow,
    //     //     nextCol,
    //     //     "DIR",
    //     //     startDir,
    //     //     " to",
    //     //     dir
    //     // );
    //     // printMatrix(matrix);
    // } else if (
    //     dir == "D" &&
    //     (!matrix[nextRow] || matrix[nextRow][nextCol] == " ")
    // ) {
    //     // we went out of bounds, start from top
    //     if (section == 2) {
    //         nextRow = 11;
    //         nextCol = 11 - col;
    //         dir = "U";
    //     } else if (section == 3) {
    //         nextRow = 11 - (col - 4);
    //         nextCol = 8;
    //         dir = "R";
    //     } else if (section == 5) {
    //         nextRow = 7;
    //         nextCol = 3 - (col - 8);
    //         dir = "U";
    //     } else if (section == 6) {
    //         nextRow = 7 - (col - 12);
    //         nextCol = 0;
    //         dir = "R";
    //     } else {
    //         console.log("SOMETHING IS WRONNNNNNNNNNNNNNNNNNNNNNG");
    //     }
    //     // console.log(
    //     //     "WE ARE GOING FROM",
    //     //     row,
    //     //     col,
    //     //     "TO ",
    //     //     nextRow,
    //     //     nextCol,
    //     //     "DIR",
    //     //     startDir,
    //     //     " to",
    //     //     dir
    //     // );
    // } else if (
    //     dir == "L" &&
    //     (!matrix[nextRow][nextCol] || matrix[nextRow][nextCol] == " ")
    // ) {
    //     if (section == 1) {
    //         nextRow = 4;
    //         nextCol = 4 + (col - 8);
    //         dir = "D";
    //     } else if (section == 2) {
    //         nextRow = 11;
    //         nextCol = 15 - (row - 4);
    //         dir = "U";
    //     } else if (section == 5) {
    //         nextRow = 7;
    //         nextCol = 7 - (row - 8);
    //         dir = "U";
    //     } else {
    //         console.log("SOMETHING IS WRONNNNNNNNNNNNNNNNNNNNNNG");
    //     }
    //     // console.log(
    //     //     "WE ARE GOING FROM",
    //     //     row,
    //     //     col,
    //     //     "TO ",
    //     //     nextRow,
    //     //     nextCol,
    //     //     "DIR",
    //     //     startDir,
    //     //     " to",
    //     //     dir
    //     // );
    // }
    // above is sample

    if (dir == "U" && (!matrix[nextRow] || matrix[nextRow][nextCol] == " ")) {
        // we went out of bounds, start from bottom
        if (section == 2) {
            nextRow = 199;
            nextCol = col - 100;
            dir = "U";
        } else if (section == 1) {
            nextRow = 150 + (col - 50);
            nextCol = 0;
            dir = "R";
        } else if (section == 5) {
            nextRow = 50 + col;
            nextCol = 50;
            dir = "R";
        } else {
            console.log("SOMETHING IS WRONNNNNNNNNNNNNNNNNNNNNNG");
        }
    } else if (
        dir == "R" &&
        (!matrix[nextRow][nextCol] || matrix[nextRow][nextCol] == " ")
    ) {
        if (section == 2) {
            nextRow = 149 - row;
            nextCol = 99;
            dir = "L";
        } else if (section == 3) {
            nextRow = 49;
            nextCol = 100 + (row - 50);
            dir = "U";
        } else if (section == 4) {
            nextRow = 49 - (row - 100);
            nextCol = 149;
            dir = "L";
        } else if (section == 6) {
            nextRow = 149;
            nextCol = 50 + (row - 150);
            dir = "U";
        } else {
            console.log("SOMETHING IS WRONNNNNNNNNNNNNNNNNNNNNNG");
        }
    } else if (
        dir == "D" &&
        (!matrix[nextRow] || matrix[nextRow][nextCol] == " ")
    ) {
        // we went out of bounds, start from top
        if (section == 2) {
            nextRow = 50 + (col - 100);
            nextCol = 99;
            dir = "L";
        } else if (section == 4) {
            nextRow = 150 + (col - 50);
            nextCol = 49;
            dir = "L";
        } else if (section == 6) {
            nextRow = 0;
            nextCol = col + 100;
            dir = "D";
        } else {
            console.log("SOMETHING IS WRONNNNNNNNNNNNNNNNNNNNNNG");
        }
    } else if (
        dir == "L" &&
        (!matrix[nextRow][nextCol] || matrix[nextRow][nextCol] == " ")
    ) {
        if (section == 1) {
            nextRow = 149 - row;
            nextCol = 0;
            dir = "R";
        } else if (section == 3) {
            nextRow = 100;
            nextCol = row - 50;
            dir = "D";
        } else if (section == 5) {
            nextRow = 49 - (row - 100);
            nextCol = 50;
            dir = "R";
        } else if (section == 6) {
            nextRow = 0;
            nextCol = 50 + (row - 150);
            dir = "D";
        } else {
            console.log("SOMETHING IS WRONNNNNNNNNNNNNNNNNNNNNNG");
        }
    }

    return [nextRow, nextCol, dir];
};

const move2 = (matrix, position, dir, steps) => {
    const obj = {
        U: "^",
        R: ">",
        D: "v",
        L: "<",
    };
    while (steps) {
        // get next position
        let [row, col] = position;
        let nextPosition = getNextPos2(matrix, position, dir);
        let [nextRow, nextCol, nextDir] = nextPosition;
        let space = matrix[nextRow][nextCol];
        if (space == "#") {
            return dir;
        }
        // if we can walk there we should
        matrix[nextRow][nextCol] = "P";
        matrix[row][col] = obj[dir];

        if (nextDir) dir = nextDir;
        position[0] = nextRow;
        position[1] = nextCol;
        steps--;
    }
    return dir;
};
let part2 = (input) => {
    let matrix = [];
    let max = input[0].length;
    for (let i = 0; i < input.length - 3; i++) {
        let el = input[i].padEnd(max, " ").split("");
        matrix.push(el);
    }
    const instructions = input.at(-2);
    let position = [0, matrix[0].indexOf(".")];
    let dir = "R";

    for (let i = 0; i < instructions.length; i++) {
        // get number
        let el = instructions[i];
        if (!Number.isNaN(+el)) {
            while (
                i + 1 < instructions.length &&
                !Number.isNaN(+instructions[i + 1])
            ) {
                el += instructions[i + 1];
                i++;
            }
            el = +el;
            // simulate moving
            dir = move2(matrix, position, dir, el);
        } else {
            // rotate based on what it says
            dir = changeDir(dir, el);
        }
    }
    let [row, col] = position;
    const dirValue = { R: 0, D: 1, L: 2, U: 3 };
    return 1000 * (row + 1) + 4 * (col + 1) + dirValue[dir];
};

const part2Solution = part2(input);
console.log(part2Solution);

// tried 149102
// 92340
// 63398
