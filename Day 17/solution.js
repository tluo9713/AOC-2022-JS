import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>> 
`;
// process raw input
let input = sampleInput;
input = rawInput;

// there will likely not be any refactoring after this. my first attempt i spent
// so many hours working on part 1, but then i couldnt finish part 2, and then
// when i couldnt finish before the next day i accidentally wrote over this file
// AND I DELETED EVERYTHING. I HATE EVERYTHING. anyway i think its a lot more
// readable than before and included some comments. btw the picture is upside
// down and reversed. this is so when we add extra lines, we dont have to shift
// and instead we push.

const solidify = (picture) => {
    // searches through every line in picture matrix
    // and replaces any # with @
    for (let i = 0; i < picture.length; i++) {
        if (picture[i].indexOf("#") == -1) continue;
        picture[i] = picture[i].join("").replace(/#/g, "@").split("");
    }
};

const fall = (picture) => {
    // any line that has a #, we'll make a copy of the array at i - 1
    // and see if we can make the # move.
    // a couple of things we'll need to do, if we make a copy, replace
    // any # with . because we dont any # to accidentally block us
    // also returns if we're done falling or not.
    const copy = [];
    for (let i = 0; i < picture.length; i++) {
        if (picture[i].indexOf("#") == -1) continue;
        if (i == 0) return false;
        copy[i - 1] = [...picture[i - 1].join("").replace(/#/g, ".")];
        for (let j = 0; j < picture[i].length; j++) {
            const char = picture[i][j];
            if (char !== "#") continue;
            if (copy[i - 1][j] != ".") return false;
            copy[i - 1][j] = char;
        }
        // we include this line because its possible that a line block
        // falls, and if we dont include this line, we dont "erase" the
        // previous image
        copy[i] = [...picture[i].join("").replace(/#/g, ".")];
    }
    // copy over whatever has to be copied
    for (let i = 0; i < copy.length; i++) {
        const line = copy[i];
        if (line != undefined) picture[i] = [...line];
    }
    return true;
};

const jetFunction = (picture, jetDir) => {
    // same idea as fall, except we need to make horizontal
    // movement.
    const copy = [];
    for (let i = 0; i < picture.length; i++) {
        if (picture[i].indexOf("#") == -1) continue;
        copy[i] = [...picture[i].join("").replace(/#/g, ".")];
        for (let j = 0; j < picture[i].length; j++) {
            let char = picture[i][j];
            if (char == "#" && jetDir == ">") {
                if (j - 1 >= 0 && ".#".includes(copy[i][j - 1]))
                    copy[i][j - 1] = char;
                else return;
            }
            if (char == "#" && jetDir == "<") {
                if (j + 1 < picture[i].length && ".".includes(copy[i][j + 1]))
                    copy[i][j + 1] = char;
                else return;
            }
        }
    }
    for (let i = 0; i < copy.length; i++) {
        let line = copy[i];
        if (line != undefined) picture[i] = [...line];
    }
};

const helper = (picture, jetDir) => {
    // jet direction first
    jetFunction(picture, jetDir);
    // fall after
    return fall(picture);
};

const rocks = [
    [".####..".split("")],
    ["...#...".split(""), "..###..".split(""), "...#...".split("")],
    ["..###..".split(""), "..#....".split(""), "..#....".split("")],
    [
        "....#..".split(""),
        "....#..".split(""),
        "....#..".split(""),
        "....#..".split(""),
    ],
    ["...##..".split(""), "...##..".split("")],
];

const part1 = (input) => {
    const picture = [
        ".......".split(""),
        ".......".split(""),
        ".......".split(""),
    ];
    let rockCount = 0;
    let highestIdx = 0;
    let jetIdx = 0;
    while (rockCount != 2022) {
        // first lets add the rock
        const spawnIdx = highestIdx + 3;
        const rock = rocks[rockCount % rocks.length];
        for (let i = 0; i < rock.length; i++) {
            picture[spawnIdx + i] = [...rock[i]];
        }
        // falling procedure?
        let stillFalling = true;
        while (stillFalling) {
            jetIdx %= input.length - 2;
            const jetDir = input[jetIdx];
            stillFalling = helper(picture, jetDir);
            jetIdx++;
        }
        solidify(picture);
        for (let i = picture.length - 1; i >= 0; i--) {
            if (picture[i].indexOf("@") == -1) continue;
            highestIdx = i + 1;
            break;
        }
        rockCount++;
    }
    // for (let i = 0; i < picture.length; i++) {
    //     console.log(picture[i]);
    // }
    // for (let i = picture.length - 1; i >= 0; i--) {
    //     console.log(picture[i].reverse());
    // }
    return highestIdx;
};

// const part1Solution = part1(input);
// console.log(part1Solution);

const part2 = (input) => {
    const picture = [
        ".......".split(""),
        ".......".split(""),
        ".......".split(""),
    ];
    let rockCount = 0;
    let highestIdx = 0;
    let jetIdx = 0;
    while (rockCount != 100000) {
        console.log(rockCount);
        // first lets add the rock
        const spawnIdx = highestIdx + 3;
        const rock = rocks[rockCount % rocks.length];
        for (let i = 0; i < rock.length; i++) {
            picture[spawnIdx + i] = [...rock[i]];
        }
        // falling procedure?
        let stillFalling = true;

        while (stillFalling) {
            jetIdx %= input.length - 2;
            const jetDir = input[jetIdx];
            stillFalling = helper(picture, jetDir);
            jetIdx++;
        }
        solidify(picture);
        for (let i = picture.length - 1; i >= 0; i--) {
            if (picture[i].indexOf("@") == -1) continue;
            highestIdx = i + 1;
            break;
        }
        rockCount++;
    }
    // for (let i = 0; i < picture.length; i++) {
    //     console.log(picture[i]);
    // }
    // for (let i = picture.length - 1; i >= 0; i--) {
    //     console.log(picture[i].reverse());
    // }
    return highestIdx;
};
const part2Solution = part2(input);
console.log(part2Solution);

// 1000 1600
// 10000 15984
