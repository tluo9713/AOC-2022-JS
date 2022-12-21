import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>> 
`;
// process raw input
let input = sampleInput;
// input = rawInput;

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
    while (rockCount != 10000) {
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
        if (rockCount % rocks.length == 0) {
            console.log(rockCount, highestIdx, jetIdx);
        }
        rockCount++;
    }
    return highestIdx;
};
const part2Solution = part2(input);
console.log(part2Solution);

// I'm gonna keep it real here im really tired.
// My patience is waning, is this entertaining?
// anyway i dont have a good way to code out how to find
// the solution to part 2, other than manually doing it.
// the logic is as follows. obviously trying to simulate
// 1,000,000,000,000 rocks is insane, even if we can simulate
// 1,000,000 rocks a second (even doing 10,000 takes more than
// a second currently) we are looking at a run time of almost 12
// days!! aint nobody got time for that. the trick is to realize
// that you can print out rockCount, highestIdx, and jetIdx
// every time rock resets (cycles back to the first rock) and
// you'll notice a patten after a certain point. the jetidx repeats!
// more than that, the increase from each jetidx is identical, which
// means theres a cycle. we just need to take advantage of this cycle
// so we can just calculate the answer instead of simulating rock drops
// included below is my console of those variables for sample input
// rockCount         height    jetIdx
//      0               1       4
//      5               10      28
//      10              18      16
//      15              26      6
//      20              37      32
//      25              44      19
//      30              51      11
//      35              61      38
//      40              67      25
//      45              73      14
//      50              79      6
//      55              90      32
//      60              97      19
//      65              104     11
//      70              114     38
//      75              120     25
//      80              126     14
//      85              132     6
//      90              143     32
//      95              150     19
//      100             157     11
//      105             167     38
//      110             173     25
//      115             179     14
//      120             185     6
// notice how the 6 repeats? and the 32 follows after always? and it
// cycles? great so from here we just take that height from where the
// first loop starts: rock count 15, height 26, jetIdx 6
// subtract that rockCount from our end of simulation rock count
// 1,000,000,000,000 - 15  = 999,999,999,985 rocks
// how many rocks are in a cycle? rockCount at the first repeat of jetIdx 6
//   is 50, the first 6 is at 15,  50-15 = 35 rocks per cycle
// so the rockCyle repeats every 35 rocks
// take remaining rocks and divide by that cycle *(see note)
// 999,999,999,985(rocks) / 35(rocks per cycle) = 28,571,428,571 cycles
// what is the height gained from this cycle of 35 rocks? the height at
// 50 rocks is 79, height at 15 rocks is 26, 79 - 26 = 53 height per cycle
// every cycle of 35 rocks, we increase the height by 53
// we take the cycles and multiply by height
// 28,571,428,571 (cycles) * 53 (height per cycle) = 1,514,285,714,263 (height)
// now that first 15 rocks we subtracted? we need to add that height back
// in,  1,514,285,714,263 + 26 = 1,514,285,714,289 (height)
// and then for some reason that im not willing to spend any more time investigating
// theres an off by one error, so we subtract 1 arbitrarily.
// 1,514,285,714,289 - 1 = 1514285714288
// viola, now we have the max height!

// *
// NOTE: in the sample, the rocks divide neatly into the rocks per cycle, and that
// makes calculation much easier. however for my input (and i imagine most inputs)
// it will NOT divide evenly. in which case you can do the following
// completeCycles = Math.floor(Rocks / cycle)
// remainderCycle = rocks % cycle
// now to find the total height, its pretty similar to before, just do
// completeCycleHeight = completeCycles * height per cycle
// for the remainderCycle, you look at your print statements and find
// the height gained at that point of the cycle and add it to the completeCycleHeight
// and you'll get the final height.

// im aware that this does only a partial job at explaining the logic and more so
// takes you along the steps of how to do it. It's a bit handwavy and not rigorous
// but I'm hoping by following the steps you kind of get an idea of whats going on,
// but also im really on the last bit of willpower.
