import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

// for this problem the input comes with some image that shows the stack of each row, like below :
//                         [Z] [W] [Z]
//         [D] [M]         [L] [P] [G]
//     [S] [N] [R]         [S] [F] [N]
//     [N] [J] [W]     [J] [F] [D] [F]
// [N] [H] [G] [J]     [H] [Q] [H] [P]
// [V] [J] [T] [F] [H] [Z] [R] [L] [M]
// [C] [M] [C] [D] [F] [T] [P] [S] [S]
// [S] [Z] [M] [T] [P] [C] [D] [C] [D]
//  1   2   3   4   5   6   7   8   9
// the parsing of this data looks incredibly difficult, so i opted to hard code the order. treat
// each column as a stack, so we start from bottom up, and type it as one string, we'll split at
// each element, this removes the difficult part. the rest is just treating this problem as a stack
// problem and removing them appropriately. might not be efficient but it certainly works
let part1 = (input) => {
    // let sampleArr = ["ZN", "MCD", "P"];
    let arr = [
        "SCVN",
        "ZMJHNS",
        "MCTGJND",
        "TDFJWRM",
        "PFH",
        "CTZHJ",
        "DPRQFSLZ",
        "CSLHDFPW",
        "DSMPFNGZ",
    ];
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split("");
    }

    for (let i = 0; i < input.length - 1; i++) {
        let el = input[i].split(" ");
        let count = el[1];
        let source = el[3];
        let target = el[5];
        for (let i = 0; i < count; i++) {
            let box = arr[source - 1].pop();
            arr[target - 1].push(box);
        }
    }
    let res = "";
    for (let i = 0; i < arr.length; i++) res += arr[i].pop();
    return res;
};

let part2 = (input) => {
    // let sampleArr = ["ZN", "MCD", "P"];
    let arr = [
        "SCVN",
        "ZMJHNS",
        "MCTGJND",
        "TDFJWRM",
        "PFH",
        "CTZHJ",
        "DPRQFSLZ",
        "CSLHDFPW",
        "DSMPFNGZ",
    ];
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split("");
    }

    for (let i = 0; i < input.length - 1; i++) {
        let el = input[i].split(" ");
        let count = el[1];
        let source = el[3];
        let target = el[5];
        let stack = [];
        for (let i = 0; i < count; i++) {
            let box = arr[source - 1].pop();
            stack.push(box);
        }
        stack = stack.reverse();
        arr[target - 1].push(...stack);
    }
    let res = "";
    for (let i = 0; i < arr.length; i++) res += arr[i].pop();
    return res;
};

let part1Solution = part1(input);
console.log(part1Solution);

let part2Solution = part2(input);
console.log(part2Solution);

// I don't have a particularly good way to deal with the set up, so i will continue to use this
// hardcoded stack. i think the code is more or less fine to be honest, but we should save a few
// lines i suppose
const sampleArr = ["ZN", "MCD", "P"];
const sourceArr = [
    "SCVN",
    "ZMJHNS",
    "MCTGJND",
    "TDFJWRM",
    "PFH",
    "CTZHJ",
    "DPRQFSLZ",
    "CSLHDFPW",
    "DSMPFNGZ",
];

const part1Clean = (input) => {
    // create own arr of crates
    const arr = sourceArr.map((crates) => crates.split(""));
    for (let i = 0; i < input.length - 1; i++) {
        const [_a, count, _b, sourceStack, _c, targetStack] =
            input[i].split(" ");

        for (let i = 0; i < count; i++) {
            const crate = arr[sourceStack - 1].pop();
            arr[targetStack - 1].push(crate);
        }
    }
    let res = "";
    for (let stack = 0; stack < arr.length; stack++) res += arr[stack].pop();
    // alternatively, can use the reduce, but i do find it less readable sometimes
    // const res = arr.reduce((str, stack) => str + stack.pop(), "");
    return res;
};

const part1SolutionClean = part1Clean(input);
console.log(part1SolutionClean);

// for (let i = 0; i < sampleArr.length; i++)
//     sampleArr[i] = sampleArr[i].split("");
const part2Clean = (input) => {
    const arr = sourceArr.map((crates) => crates.split(""));
    for (let i = 0; i < input.length - 1; i++) {
        const [_a, count, _b, sourceStack, _c, targetStack] =
            input[i].split(" ");
        // using splice will remove from the source stack, and return what was removed
        const crates = arr[sourceStack - 1].splice(-1 * count, count);
        arr[targetStack - 1].push(...crates);
    }
    let res = "";
    for (let stack = 0; stack < arr.length; stack++) res += arr[stack].pop();
    // const res = arr.reduce((str, stack) => str + stack.pop(), "");
    return res;
};

const part2SolutionClean = part2Clean(input);
console.log(part2SolutionClean);

// as an additonal challenge, perhaps you may find it unfair that i didn't parse that data
// myself or will need some function to parse that initial data, below i included such a thing
// for funsies
let forFunChallenge = `                        [Z] [W] [Z]
        [D] [M]         [L] [P] [G]
    [S] [N] [R]         [S] [F] [N]
    [N] [J] [W]     [J] [F] [D] [F]
[N] [H] [G] [J]     [H] [Q] [H] [P]
[V] [J] [T] [F] [H] [Z] [R] [L] [M]
[C] [M] [C] [D] [F] [T] [P] [S] [S]
[S] [Z] [M] [T] [P] [C] [D] [C] [D]
 1   2   3   4   5   6   7   8   9


`;
forFunChallenge = forFunChallenge.split("\n");
let forFunArr = [];
for (let i = 0; i < forFunChallenge.length; i++) {
    const line = forFunChallenge[i];

    // if char is an int, we reached the end of the crates
    const isLastLine = Number.isInteger(Number(line[1]));
    const isNotEmpty = line[1] != " ";
    // if both are true, we can break out of this section. alternatively we can set some flag as
    // finished parsing crate location
    if (isNotEmpty && isLastLine) break;
    // if we encounter empty space, we ignore. else we slot the char in its appropriate idx
    for (let j = 1; j < line.length; j += 4) {
        const char = line[j];
        if (char == " ") continue;
        const idx = Math.floor(j / 4);
        if (!forFunArr[idx]) forFunArr[idx] = "";
        forFunArr[idx] += char;
    }
}

// now just reverse and split
forFunArr = forFunArr.map((el) => el.split("").reverse());
