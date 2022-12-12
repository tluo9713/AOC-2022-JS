import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

let sampleInput = `Monkey 0:
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
                // with 10000 rounds, numbers will get incredibly large and may not be
                //represented correctly we need a way to use a smaller version of the
                // number that still gets the same results from the monkey tests
                // below works because each of these divisibility test check for prime
                // numbers, if we multiply these numbers together, the mod will not
                //influence any of the test results and we'll get the correct stress count
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

// i kind of took my time with part 1 so its fairly straightforward and i have no problem with
// it in general.
// below i wrote out a process input function that is extensible. if there are new operations
// we just add them to the operations dict
// afterwards i have a reusable monkey business function that handles most of the logic for
// part 1 and 2

const processInput = (input) => {
    const MONKEY = "Monkey ";
    const STARTING_ITEMS = "  Starting items: ";
    const OPERATION = "  Operation: new = old ";
    // do above later
    const TEST = "  Test: divisible by ";
    const IF_TRUE = "    If true: throw to monkey ";
    const IF_FALSE = "    If false: throw to monkey ";
    const factors = [];
    const monkeyItems = [];
    const monkeyOp = {};
    const monkeyTest = {};
    const op = {
        "*": (old, val) => old * val,
        "/": (old, val) => old / val,
        "+": (old, val) => old + val,
        "-": (old, val) => old - val,
    };
    let currentMonkey;
    let divisibleBy;
    let monkeyIfTrue;
    for (let line of input) {
        // processes each line depending on the start of the line
        if (line.includes(MONKEY)) {
            currentMonkey = line.slice(MONKEY.length, -1);
            continue;
        }
        if (line.includes(STARTING_ITEMS)) {
            // converts items from string values to ints
            const items = line
                .slice(STARTING_ITEMS.length)
                .split(",")
                .map((e) => Number(e));
            monkeyItems[currentMonkey] = items;
            continue;
        }
        if (line.includes(OPERATION)) {
            const operationLine = line.slice(OPERATION.length);
            let [currOp, val] = operationLine.split(" ");
            // if val is not old, its a number and we should convert it to an int
            val = val == "old" ? val : Number(val);
            // we assign current monkey the operation based on currOp and val, refer to op object
            // for operations
            monkeyOp[currentMonkey] = (old) => {
                let scopeVal = val;
                if (scopeVal == "old") scopeVal = old;
                return op[currOp](old, scopeVal);
            };
            continue;
        }
        if (line.includes(TEST)) {
            const divisibility = line.slice(TEST.length);
            divisibleBy = divisibility;
            factors.push(divisibleBy);
            continue;
        }
        if (line.includes(IF_TRUE)) {
            const throwToMonkey = line.slice(IF_TRUE.length);
            monkeyIfTrue = Number(throwToMonkey);
            continue;
        }
        if (line.includes(IF_FALSE)) {
            const throwToMonkey = line.slice(IF_FALSE.length);
            const scopeDivisibleBy = divisibleBy;
            const scopeMonkeyIfTrue = monkeyIfTrue;
            const scopeMonkeyIfFalse = Number(throwToMonkey);
            monkeyTest[currentMonkey] = (num) =>
                num % scopeDivisibleBy == 0
                    ? scopeMonkeyIfTrue
                    : scopeMonkeyIfFalse;
            continue;
            // if we like, we can set those other values to null or undefined if we're
            // worried about using the same variables when we shouldnt.
        }
    }
    return [monkeyItems, monkeyOp, monkeyTest, factors];
};

const monkeyBuisness = (
    monkeyItems,
    monkeyOp,
    monkeyTest,
    monkeyInspections,
    rounds,
    worryReduction
) => {
    // this will handle all the monkey business computing
    for (let i = 0; i < rounds; i++) {
        for (let monkey = 0; monkey < monkeyItems.length; monkey++) {
            // while monkey still have items to examine
            while (monkeyItems[monkey].length) {
                const item = monkeyItems[monkey].shift();
                let worry = monkeyOp[monkey](item);
                worry = worryReduction(worry);
                const nextMonkey = monkeyTest[monkey](worry);
                monkeyItems[nextMonkey].push(worry);
                monkeyInspections[monkey]++;
            }
        }
    }
};

let input = newLineSplitter(rawInput);

let part1Refactor = (input) => {
    const [monkeyItems, monkeyOp, monkeyTest, _] = processInput(input);
    let monkeyInspections = new Array(monkeyItems.length).fill(0);
    const ROUNDS = 20;
    const worryReduction = (stress) => Math.floor(stress / 3);

    monkeyBuisness(
        monkeyItems,
        monkeyOp,
        monkeyTest,
        monkeyInspections,
        ROUNDS,
        worryReduction
    );

    monkeyInspections.sort((a, b) => a - b);
    let a = monkeyInspections.pop();
    let b = monkeyInspections.pop();
    return a * b;
};

const part1RefactorSolution = part1Refactor(input);
console.log(part1RefactorSolution);

let part2Refactor = (input) => {
    const [monkeyItems, monkeyOp, monkeyTest, factors] = processInput(input);
    let monkeyInspections = new Array(monkeyItems.length).fill(0);
    const ROUNDS = 10000;

    const worryReduction = (stress) =>
        (stress %= factors.reduce((prod, el) => prod * el));
    monkeyBuisness(
        monkeyItems,
        monkeyOp,
        monkeyTest,
        monkeyInspections,
        ROUNDS,
        worryReduction
    );

    monkeyInspections.sort((a, b) => a - b);
    let a = monkeyInspections.pop();
    let b = monkeyInspections.pop();

    return a * b;
};

const part2RefactorSolution = part2Refactor(input);
console.log(part2RefactorSolution);
