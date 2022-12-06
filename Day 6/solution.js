import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `bvwbjplbgvbhsrlpgdmjqwftvncz`;
// process raw input
let input = sampleInput;
input = rawInput;

let part1 = (input) => {
    let res = 0;
    for (let i = 3; i < input.length - 1; i++) {
        let a = input[i - 3];
        let b = input[i - 2];
        let c = input[i - 1];
        let d = input[i];
        let set = new Set([a, b, c, d]);
        if (set.size == 4) return i + 1;
    }
    return res;
};

let part2 = (input) => {
    let res = 0;
    // note i am aware post submission that technically i should update this so i is equal to 13
    // but i guess im fairly lucky this edgecase has no issue on my code
    for (let i = 3; i < input.length - 1; i++) {
        let set = new Set();
        for (let j = i - 13; j <= i; j++) {
            set.add(input[j]);
        }
        if (set.size == 14) return i + 1;
    }
    return res;
};

const part1Solution = part1(input);
console.log(part1Solution);

const part2Solution = part2(input);
console.log(part2Solution);

// this was fairly straightforward, really nothing significant to change

const checkForUniqueChars = (str) => {
    const set = new Set(str.split(""));
    return set.size == str.length;
};

let part1Clean = (input) => {
    let res = 0;
    for (let i = 3; i < input.length - 1; i++) {
        let str = input.slice(i - 3, i + 1);
        if (checkForUniqueChars(str)) return i + 1;
    }
    return res;
};

let part2Clean = (input) => {
    let res = 0;
    for (let i = 13; i < input.length - 1; i++) {
        let str = input.slice(i - 13, i + 1);
        if (checkForUniqueChars(str)) return i + 1;
    }
    return res;
};

const part1CleanSolution = part1Clean(input);
console.log(part1CleanSolution);

const part2CleanSolution = part2Clean(input);
console.log(part2CleanSolution);

// technically the code above is O(n) time and O(1) space complexity, but perhaps you would like
// to optimize the code a bit more. we could use a sliding window
const addToObj = (obj, char) => {
    if (!obj[char]) {
        obj[char] = 0;
        obj.unique++;
    }
    obj[char]++;
    obj.length++;
};

const removeFromObj = (obj, char) => {
    obj[char]--;
    if (!obj[char]) obj.unique--;
    obj.length--;
};

// at this point, there is no need to do a part 2 version of this function, as all we have to
// change is the numOfUniqueChars variable which is trivial, we can even pass that as an argument
// so we can check any amount of chars.
let part1Optimized = (input) => {
    let res = 0;
    let obj = { unique: 0, length: 0 };
    const numOfUniqueChars = 4;
    for (let i = 0; i < input.length - 1; i++) {
        // get the char and add it to our sliding window obj
        const char = input[i];
        addToObj(obj, char);

        // if adding the char pushes us past the length we need, we should remove char that
        // falls outside the window
        if (obj.length > numOfUniqueChars) {
            // we need to remove the char that leaves the window
            const removeChar = input[i - numOfUniqueChars];
            removeFromObj(obj, removeChar);
        }
        if (obj.unique == numOfUniqueChars) return i + 1;
    }
    return res;
};

const part1OptimizedSolution = part1Optimized(input);
console.log(part1OptimizedSolution);
