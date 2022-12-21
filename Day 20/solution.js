import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `1
2
-3
3
-2
0
4
`;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

// with the js built in array method, splice, this was fairly trivial
// you just find the index of the number, calculate the index after moving
// (make sure to take the mod) and splice out the original and splice the
// number where it should be after
// the only thing that you have to keep in mind is there are duplicates
// in the input. this makes it so if we needed to get the index of
// a number, js will return the first instance of that numbers idx to us
// this means that we could be splicing the wrong number. to counteract this
// we can implement a jank solution in which case we add some unique
// identifier and store it as a str instead of a number. that way when we
// find the index of a number+identifier we will always find the correct
// one to splice out and splice in.
let part1 = (input) => {
    let arr = [];
    let zeroJank;
    for (let i = 0; i < input.length - 1; i++) {
        let el = input[i];
        if (el == 0) zeroJank = `${el}+${i}`;
        arr.push(`${el}+${i}`);
    }
    let copy = [...arr];
    let len = arr.length;
    for (let el of copy) {
        let idx = arr.indexOf(el);
        let [num, _] = el.split("+");
        let afterIdx = (idx + +num) % (len - 1);
        arr.splice(idx, 1);
        arr.splice(afterIdx, 0, el);
    }
    // we need to move
    let zeroIdx = arr.indexOf(zeroJank);
    let res = 0;
    for (let i = 1; i <= 3; i++) {
        let idx = zeroIdx + i * 1000;
        let [val, _] = arr[idx % len].split("+");
        res += +val;
    }
    return res;
};

const part1Solution = part1(input);
console.log(part1Solution);

let part2 = (input) => {
    let arr = [];
    let zeroJank;
    let KEY = 811589153;
    // we literally just multiply the starting numbers by the encryption key
    // and for loop it 10 times. there was nothing special about this part
    for (let i = 0; i < input.length - 1; i++) {
        let el = +input[i] * KEY;
        if (el == 0) zeroJank = `${el}+${i}`;
        arr.push(`${el}+${i}`);
    }
    let copy = [...arr];

    let len = arr.length;
    for (let i = 0; i < 10; i++) {
        for (let el of copy) {
            let idx = arr.indexOf(el);
            let [num, _] = el.split("+");
            let afterIdx = (idx + +num) % (len - 1);
            arr.splice(idx, 1);
            arr.splice(afterIdx, 0, el);
        }
    }
    let zeroIdx = arr.indexOf(zeroJank);
    let res = 0;
    for (let i = 1; i <= 3; i++) {
        let idx = zeroIdx + i * 1000;
        let [val, _] = arr[idx % len].split("+");
        res += +val;
    }
    return res;
};
const part2Solution = part2(input);
console.log(part2Solution);

// above is an n^2 solution cause you have to go through every element and for each
// use indexof which is an n time complexity action, as well as splice.
// below is refactored but not much changes

const parseInput = (input, key = 1) => {
    const arr = [];
    let zeroIdentifier;
    for (let i = 0; i < input.length - 1; i++) {
        const el = input[i];
        const val = Number(el) * key;
        const str = `${val}+${i}`;
        if (el == 0) zeroIdentifier = str;
        arr.push(str);
    }
    return [arr, zeroIdentifier];
};

const mixCoordinates = (originalOrder, arr) => {
    for (let el of originalOrder) {
        let idx = arr.indexOf(el);
        let [num, _] = el.split("+");
        let indexAfterMoving = (idx + Number(num)) % (arr.length - 1);
        arr.splice(idx, 1);
        arr.splice(indexAfterMoving, 0, el);
    }
};

const sumOfCoordinates = (arr, zeroIdentifier) => {
    const zeroIdx = arr.indexOf(zeroIdentifier);
    let res = 0;
    for (let i = 1; i <= 3; i++) {
        let idx = zeroIdx + i * 1000;
        let [val, _] = arr[idx % arr.length].split("+");
        res += Number(val);
    }
    return res;
};

let part1Refactor = (input) => {
    const [arr, zeroIdentifier] = parseInput(input);
    const originalOrder = [...arr];
    mixCoordinates(originalOrder, arr);

    return sumOfCoordinates(arr, zeroIdentifier);
};

const part1RefactorSolution = part1Refactor(input);
console.log(part1RefactorSolution);

let part2Refactor = (input) => {
    const KEY = 811589153;
    const [arr, zeroIdentifier] = parseInput(input, KEY);
    const originalOrder = [...arr];

    for (let i = 0; i < 10; i++) mixCoordinates(originalOrder, arr);

    return sumOfCoordinates(arr, zeroIdentifier);
};

const part2RefactorSolution = part2Refactor(input);
console.log(part2RefactorSolution);
