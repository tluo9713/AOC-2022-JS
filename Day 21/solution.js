import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32
`;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

let part1 = (input) => {
    let obj = {};
    for (let i = 0; i < input.length - 1; i++) {
        let el = input[i].split(" ");
        let [name, one, two, three] = el;
        name = name.slice(0, -1);
        if (two == undefined) {
            obj[name] = +one;
        } else {
            obj[name] = [one, two, three];
        }
    }
    let changed = true;
    while (changed) {
        changed = false;
        for (let key in obj) {
            let el = obj[key];
            if (Array.isArray(el)) {
                let [one, two, three] = el;
                let first;
                if (typeof one == "string" && typeof obj[one] == "number")
                    first = obj[one];
                let second;
                if (typeof three == "string" && typeof obj[three] == "number")
                    second = obj[three];
                if (one == undefined || second == undefined) continue;
                if (typeof first == "number" && typeof second == "number") {
                    let answer;
                    if (two == "+") answer = first + second;
                    if (two == "-") answer = first - second;
                    if (two == "*") answer = first * second;
                    if (two == "/") answer = first / second;
                    obj[key] = answer;
                    changed = true;
                }
            }
        }
    }
    return obj.root;
};

const part1Solution = part1(input);
console.log(part1Solution);

let part2 = (input) => {
    let obj = {};
    for (let i = 0; i < input.length - 1; i++) {
        let el = input[i].split(" ");
        let [name, one, two, three] = el;
        name = name.slice(0, -1);
        if (two == undefined) {
            obj[name] = +one;
            if (name == "humn") obj[name] = ["jank jank jank it up"];
        } else {
            obj[name] = [one, two, three];
        }
    }
    let changed = true;
    while (changed) {
        changed = false;
        for (let key in obj) {
            let el = obj[key];
            if (Array.isArray(el)) {
                let [one, two, three] = el;
                let first;
                if (typeof one == "string" && typeof obj[one] == "number")
                    first = obj[one];
                let second;
                if (typeof three == "string" && typeof obj[three] == "number")
                    second = obj[three];
                if (one == undefined || second == undefined) continue;
                if (key == "root") continue;
                if (typeof first == "number" && typeof second == "number") {
                    let answer;
                    if (two == "+") answer = first + second;
                    if (two == "-") answer = first - second;
                    if (two == "*") answer = first * second;
                    if (two == "/") answer = first / second;
                    obj[key] = answer;
                    changed = true;
                }
            }
        }
    }
    const dfs = (key, val, i = 0) => {
        if (key == "humn") return val;
        let [one, op, three] = obj[key];
        let num = typeof obj[one] == "number" ? obj[one] : obj[three];
        let next = typeof obj[one] != "number" ? one : three;
        if (op == "*") {
            val /= num;
        }
        if (op == "/") {
            if (num == obj[one]) val = num / val;
            else val *= num;
        }
        if (op == "+") {
            if (num == obj[one]) val -= num;
            else val -= num;
        }
        if (op == "-") {
            if (num == obj[one]) val = num - val;
            else val += num;
        }
        return dfs(next, val, i + 1);
    };
    let [one, _, two] = obj.root;
    let num = typeof obj[one] == "number" ? obj[one] : obj[two];
    let key = typeof obj[one] != "number" ? one : two;
    return dfs(key, num);
};

const part2Solution = part2(input);
console.log(part2Solution);

const processInput = (input, ignoreMonkey = "") => {
    let obj = {};
    for (let i = 0; i < input.length - 1; i++) {
        let el = input[i].split(" ");
        let [monkey, one, op, two] = el;
        monkey = monkey.slice(0, -1);
        if (op == undefined) {
            obj[monkey] = Number(one);
        } else {
            obj[monkey] = [one, op, two];
        }
        if (monkey == ignoreMonkey) obj[monkey] = "I am the monkey.";
    }
    return obj;
};

// could use eval function but it was slower and it kind of bothered
// me, so i wrote this
const evaluateOperation = (numA, numB, op) => {
    if (op == "+") return numA + numB;
    if (op == "-") return numA - numB;
    if (op == "*") return numA * numB;
    if (op == "/") return numA / numB;
    throw Error(`Unknown Operation: ${op}`);
};

const evaluateMonkeys = (obj) => {
    let changed = false;
    for (let monkey in obj) {
        const el = obj[monkey];
        if (!Array.isArray(el)) continue;
        const [one, op, two] = el;
        if (typeof obj[one] != "number") continue;
        if (typeof obj[two] != "number") continue;
        const numA = obj[one];
        const numB = obj[two];

        obj[monkey] = evaluateOperation(numA, numB, op);
        changed = true;
    }
    return changed;
};

// for time you could probably do some topological thing(?), but im going to
// keep it simple and just keep track of every time something updates, we're
// going to run our function again until we stop

const part1Refactor = (input) => {
    const obj = processInput(input);

    let changed = true;
    while (changed) {
        changed = evaluateMonkeys(obj);
    }
    return obj["root"];
};

const part1RefactorSolution = part1Refactor(input);
console.log(part1RefactorSolution);

const reverseEvaluate = (num, op, val, numPosition) => {
    if (op == "*") return val / num;
    if (op == "+") return val - num;

    // assume a - b, a is position 1, + is position 2, b is position 3
    // so our equation is a - b = val
    // if we know b,  then our eq becomes a = val + b and this makes sense
    if (op == "-" && numPosition == 3) return val + num;
    // however if we know a, the eq now becomes
    // a - b = val => a = val + b => a - val = b, hence why position
    // matters
    if (op == "-" && numPosition == 1) return num - val;
    // same as above
    if (op == "/" && numPosition == 3) return val * num;
    if (op == "/" && numPosition == 1) return num / val;
};
const dfs = (obj, key, val) => {
    if (key == "humn") return val;
    let [monkeyA, op, monkeyB] = obj[key];
    const numPosition = typeof obj[monkeyA] == "number" ? 1 : 3;

    let num = numPosition == 1 ? obj[monkeyA] : obj[monkeyB];
    let next = numPosition == 3 ? monkeyA : monkeyB;
    val = reverseEvaluate(num, op, val, numPosition);
    return dfs(obj, next, val);
};

const part2Refactor = (input) => {
    const ignoreMonkey = "humn";
    const obj = processInput(input, ignoreMonkey);

    let changed = true;
    while (changed) changed = evaluateMonkeys(obj);

    const [one, _, two] = obj.root;
    const num = typeof obj[one] == "number" ? obj[one] : obj[two];
    const key = typeof obj[one] != "number" ? one : two;
    return dfs(obj, key, num);
};

const part2RefactorSolution = part2Refactor(input);
console.log(part2RefactorSolution);
