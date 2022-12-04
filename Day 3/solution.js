import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

let part1 = (input) => {
    // the logic here is to split each line into two strings, and to check if for the first
    // char in the first string that exists in the second string. that char gets added to res
    // which represents all the common items. at the end we'll iterate through every letter
    // in the common items string and get the value of each item.
    let res = "";

    for (let i = 0; i < input.length - 1; i++) {
        let el = input[i];
        let len = el.length / 2;
        let first = el.slice(0, len);
        let second = el.slice(len);
        // find the same letter
        for (let char of first) {
            if (second.indexOf(char) !== -1) {
                res += char;
                break;
            }
        }
    }
    let val = 0;
    // as you can see, we first get the char code and subtract 97. if its  0 or greater, it means
    // its a lower case letter, in which case we add that num + 1 because a = 1, not 0. this was
    // literally my first thought, imagine just subtracting 96? and then obviously because if
    // the num is negative its an upper case, so we have to undo the previous subtraction by adding
    // 97, we also subtract by 65 because thats the char code of A, and then we add 27 because A
    // is worth 27
    for (let i = 0; i < res.length; i++) {
        let num = res.charCodeAt(i) - 97;
        if (num >= 0) val += num + 1;
        else val += num + 97 - 65 + 27;
    }
    return val;
};

let part2 = (input) => {
    // we'll grab the 3 lines at a time to compare for a common char in all of them. to do so
    // we'll put all chars in line into a set, next we'll check every other line and update
    // a new set that only keeps track of every char in current line and previous set. a for
    // loop for 2 lines. lol. naming convention is immaculate as always
    let res = "";

    for (let i = 0; i < input.length - 1; i += 3) {
        let set = new Set(input[i].split(""));
        for (let j = 1; j < 3; j++) {
            let newSet = new Set();
            for (let char of input[i + j]) {
                if (set.has(char)) newSet.add(char);
            }
            set = newSet;
        }
        res += [...set].at(0);
    }
    let val = 0;
    // same logic as previous
    for (let i = 0; i < res.length; i++) {
        let num = res.charCodeAt(i) - 97;
        if (num >= 0) val += num + 1;
        else val += num + 97 - 65 + 27;
    }
    return val;
};

let part1Solution = part1(input);
console.log(part1Solution);

let part2Solution = part2(input);
console.log(part2Solution);

const getIntersection = (set1, set2) => {
    // gets intersection of two sets
    return new Set([...set1].filter((el) => set2.has(el)));
};

const getCommonItem = (rucksack1, ...rucksacks) => {
    // grabs the first common item between all strings passed in
    // this assumes there is only one char, and will return only the first char
    // add all items into our set
    let previousSet = new Set([...rucksack1]);
    // check for common items in all possible ruck sacks
    for (let rucksack of rucksacks) {
        const currSet = new Set([...rucksack]);
        // get the intersection of items
        previousSet = getIntersection(previousSet, currSet);
    }
    return [...previousSet][0];
};

const getPriority = (char) => {
    if (char == char.toLowerCase()) return char.charCodeAt(0) - 96;
    return char.charCodeAt(0) - 64 + 26;
};

const getRuckSacks = (input, start, end) => {
    const rucksacks = [];
    for (let i = start; i < end; i++) rucksacks.push(input[i]);
    return rucksacks;
};

const part1Clean = (input) => {
    let res = 0;

    for (let i = 0; i < input.length - 1; i++) {
        const rucksack = input[i];
        const halfLen = rucksack.length / 2;
        const compartment1 = rucksack.slice(0, halfLen);
        const compartment2 = rucksack.slice(halfLen);

        const commonChar = getCommonItem(compartment1, compartment2);
        res += getPriority(commonChar);
    }
    return res;
};

const part2Clean = (input) => {
    let res = 0;
    const rucksackCount = 3;
    for (let i = 0; i < input.length - 1; i += rucksackCount) {
        const rucksacks = getRuckSacks(input, i, i + rucksackCount);

        const commonChar = getCommonItem(...rucksacks);
        res += getPriority(commonChar);
    }
    return res;
};

const part1SolutionClean = part1Clean(input);
console.log(part1SolutionClean);

const part2SolutionClean = part2Clean(input);
console.log(part2SolutionClean);
