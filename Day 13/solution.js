import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

// lets take advantage of js eval function to allow us to process info line by line, otherwise
// we use a helper function to help us recursively call to check if one is before the other
// for part 2, the idea is we can use that same function and configure it as a callback function
// to sort instead

let helper = (arr1, arr2) => {
    let max = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < max; i++) {
        let a = arr1[i];
        let b = arr2[i];
        if (a != undefined && b == undefined) return false;
        if (a == undefined && b != undefined) return true;
        if (typeof a == "number" && typeof b == "number") {
            if (a == b) continue;
            return a < b;
        }
        if (typeof a == "number") a = [a];
        if (typeof b == "number") b = [b];
        let res = helper(a, b);
        if (res == undefined) continue;
        return res;
    }
    return undefined;
};
let part1 = (input) => {
    let res = 0;
    let idx = 1;
    for (let i = 0; i < input.length - 1; i += 3) {
        let first = eval(input[i]);
        let second = eval(input[i + 1]);
        if (helper(first, second)) res += idx;
        idx++;
    }
    return res;
};

const part1Solution = part1(input);
console.log(part1Solution);

let helper2 = (arr1, arr2) => {
    let max = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < max; i++) {
        let a = arr1[i];
        let b = arr2[i];
        if (a != undefined && b == undefined) return 1;
        if (a == undefined && b != undefined) return -1;
        if (typeof a == "number" && typeof b == "number") {
            if (a == b) continue;
            return a - b;
        }
        if (typeof a == "number") a = [a];
        if (typeof b == "number") b = [b];
        let res = helper2(a, b);
        if (res == 0) continue;
        return res;
    }
    return 0;
};

let part2 = (input) => {
    let arr = [];

    for (let i = 0; i < input.length - 1; i++) {
        let line = input[i];
        if (line != "") arr.push(eval(line));
    }
    arr.push([[2]]);
    arr.push([[6]]);
    arr.sort(helper2);
    let test = [];
    for (let i = 0; i < arr.length; i++) {
        if ("" + arr[i] == "2") test.push(i + 1);
        if ("" + arr[i] == "6") test.push(i + 1);
    }
    return test[0] * test[1];
};

const part2Solution = part2(input);
console.log(part2Solution);

// we can use part 2 helper as the main reused function and part1 and part 2 will use it
// accordingly
