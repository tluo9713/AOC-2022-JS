import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1
  `;

// could you imagine processing the input with code instead of hard coding things?
// lol
let part1 = () => {
    // below is for sample input
    // let monkeyItems = [[79, 98], [54, 65, 75, 74], [79, 60, 97], [74]];
    // let monkeyOp = {
    //     0: (old) => old * 19,
    //     1: (old) => old + 6,
    //     2: (old) => old * old,
    //     3: (old) => old + 3,
    // };
    // let monkeyTest = {
    //     0: (num) => (num % 23 == 0 ? 2 : 3),
    //     1: (num) => (num % 19 == 0 ? 2 : 0),
    //     2: (num) => (num % 13 == 0 ? 1 : 3),
    //     3: (num) => (num % 17 == 0 ? 0 : 1),
    // };
    // let res = [0, 0, 0, 0];
    // above are for sample input
    let monkeyItems = [
        [74, 64, 74, 63, 53],
        [69, 99, 95, 62],
        [59, 81],
        [50, 67, 63, 57, 63, 83, 97],
        [61, 94, 85, 52, 81, 90, 94, 70],
        [69],
        [54, 55, 58],
        [79, 51, 83, 88, 93, 76],
    ];
    let monkeyOp = {
        0: (old) => old * 7,
        1: (old) => old * old,
        2: (old) => old + 8,
        3: (old) => old + 4,
        4: (old) => old + 3,
        5: (old) => old + 5,
        6: (old) => old + 7,
        7: (old) => old * 3,
    };

    let monkeyTest = {
        0: (num) => (num % 5 == 0 ? 1 : 6),
        1: (num) => (num % 17 == 0 ? 2 : 5),
        2: (num) => (num % 7 == 0 ? 4 : 3),
        3: (num) => (num % 13 == 0 ? 0 : 7),
        4: (num) => (num % 19 == 0 ? 7 : 3),
        5: (num) => (num % 3 == 0 ? 4 : 2),
        6: (num) => (num % 11 == 0 ? 1 : 5),
        7: (num) => (num % 2 == 0 ? 0 : 6),
    };

    let res = [0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < 20; i++) {
        for (let monkey = 0; monkey < 8; monkey++) {
            while (monkeyItems[monkey].length) {
                let item = monkeyItems[monkey].shift();
                let worry = monkeyOp[monkey](item);
                worry = Math.floor(worry / 3);
                let nextMonkey = monkeyTest[monkey](worry);
                monkeyItems[nextMonkey].push(worry);
                res[monkey]++;
            }
        }
    }
    res.sort((a, b) => a - b);
    let a = res.pop();
    let b = res.pop();
    return a * b;
};

const part1Solution = part1();
console.log(part1Solution);

let part2 = () => {
    // below is for sample input
    // let monkeyItems = [[79, 98], [54, 65, 75, 74], [79, 60, 97], [74]];
    // let monkeyOp = {
    //     0: (old) => old * 19,
    //     1: (old) => old + 6,
    //     2: (old) => old * old,
    //     3: (old) => old + 3,
    // };
    // let monkeyTest = {
    //     0: (num) => (num % 23 == 0 ? 2 : 3),
    //     1: (num) => (num % 19 == 0 ? 2 : 0),
    //     2: (num) => (num % 13 == 0 ? 1 : 3),
    //     3: (num) => (num % 17 == 0 ? 0 : 1),
    // };
    // let res = [0, 0, 0, 0];
    // above are for sample input
    let monkeyItems = [
        [74, 64, 74, 63, 53],
        [69, 99, 95, 62],
        [59, 81],
        [50, 67, 63, 57, 63, 83, 97],
        [61, 94, 85, 52, 81, 90, 94, 70],
        [69],
        [54, 55, 58],
        [79, 51, 83, 88, 93, 76],
    ];
    let monkeyOp = {
        0: (old) => old * 7,
        1: (old) => old * old,
        2: (old) => old + 8,
        3: (old) => old + 4,
        4: (old) => old + 3,
        5: (old) => old + 5,
        6: (old) => old + 7,
        7: (old) => old * 3,
    };
    let monkeyTest = {
        0: (num) => (num % 5 == 0 ? 1 : 6),
        1: (num) => (num % 17 == 0 ? 2 : 5),
        2: (num) => (num % 7 == 0 ? 4 : 3),
        3: (num) => (num % 13 == 0 ? 0 : 7),
        4: (num) => (num % 19 == 0 ? 7 : 3),
        5: (num) => (num % 3 == 0 ? 4 : 2),
        6: (num) => (num % 11 == 0 ? 1 : 5),
        7: (num) => (num % 2 == 0 ? 0 : 6),
    };
    let res = [0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < 10000; i++) {
        for (let monkey = 0; monkey < 8; monkey++) {
            while (monkeyItems[monkey].length) {
                let item = monkeyItems[monkey].shift();
                let worry = monkeyOp[monkey](item);
                worry %= 5 * 17 * 7 * 13 * 19 * 3 * 11 * 2;
                let nextMonkey = monkeyTest[monkey](worry);
                monkeyItems[nextMonkey].push(worry);
                res[monkey]++;
            }
        }
    }
    res.sort((a, b) => a - b);
    let a = res.pop();
    let b = res.pop();
    return a * b;
};

const part2Solution = part2();
console.log(part2Solution);

// process raw input
// input = newLineSplitter(rawInput);

// let input = sampleInput.split("Monkey");
// for (let i = 0; i < input.length; i++) console.log(i, input[i]);

// i kind of took my time with part 1 so its fairly straightforward and i have no problem with
// it in general. here are some minor refactoring.

const monkeyBuisness = () => {};

let part1Refactor = () => {
    // below is for sample input
    // let monkeyItems = [[79, 98], [54, 65, 75, 74], [79, 60, 97], [74]];
    // let monkeyOp = {
    //     0: (old) => old * 19,
    //     1: (old) => old + 6,
    //     2: (old) => old * old,
    //     3: (old) => old + 3,
    // };
    // let monkeyTest = {
    //     0: (num) => (num % 23 == 0 ? 2 : 3),
    //     1: (num) => (num % 19 == 0 ? 2 : 0),
    //     2: (num) => (num % 13 == 0 ? 1 : 3),
    //     3: (num) => (num % 17 == 0 ? 0 : 1),
    // };
    // let res = [0, 0, 0, 0];
    // above are for sample input
    let monkeyItems = [
        [74, 64, 74, 63, 53],
        [69, 99, 95, 62],
        [59, 81],
        [50, 67, 63, 57, 63, 83, 97],
        [61, 94, 85, 52, 81, 90, 94, 70],
        [69],
        [54, 55, 58],
        [79, 51, 83, 88, 93, 76],
    ];
    let monkeyOp = {
        0: (old) => old * 7,
        1: (old) => old * old,
        2: (old) => old + 8,
        3: (old) => old + 4,
        4: (old) => old + 3,
        5: (old) => old + 5,
        6: (old) => old + 7,
        7: (old) => old * 3,
    };

    let monkeyTest = {
        0: (num) => (num % 5 == 0 ? 1 : 6),
        1: (num) => (num % 17 == 0 ? 2 : 5),
        2: (num) => (num % 7 == 0 ? 4 : 3),
        3: (num) => (num % 13 == 0 ? 0 : 7),
        4: (num) => (num % 19 == 0 ? 7 : 3),
        5: (num) => (num % 3 == 0 ? 4 : 2),
        6: (num) => (num % 11 == 0 ? 1 : 5),
        7: (num) => (num % 2 == 0 ? 0 : 6),
    };

    let res = [0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < 20; i++) {
        for (let monkey = 0; monkey < 8; monkey++) {
            while (monkeyItems[monkey].length) {
                let item = monkeyItems[monkey].shift();
                let worry = monkeyOp[monkey](item);
                worry = Math.floor(worry / 3);
                let nextMonkey = monkeyTest[monkey](worry);
                monkeyItems[nextMonkey].push(worry);
                res[monkey]++;
            }
        }
    }
    res.sort((a, b) => a - b);
    let a = res.pop();
    let b = res.pop();
    return a * b;
};

const part1RefactorSolution = part1Refactor();
console.log(part1RefactorSolution);
