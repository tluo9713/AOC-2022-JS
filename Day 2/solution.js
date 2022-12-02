import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `A Y
B X
C Z`;
// process raw input
// let input = newLineSplitter(sampleInput);
let input = newLineSplitter(rawInput);

// Below are my first attempts for day 2, I did a little refactoring but overall wanted
// to preserve what it looks like. logic is not great, and it was definitely more ugly before.
// for future reference i will not even refactor. its a good reminder that not everything is perfect
// on the first iteration.
let part1FirstAttempt = (input) => {
    let res = 0;
    let pointsForChoice = { X: 1, Y: 2, Z: 3 };
    let winPairs = { A: "Y", B: "Z", C: "X" };
    let tiePairs = { A: "X", B: "Y", C: "Z" };
    for (let i = 0; i < input.length - 1; i++) {
        let [opp, me] = input[i].split(" ");
        res += pointsForChoice[me];
        if (winPairs[opp] == me) {
            // if you win
            res += 6;
        } else if (tiePairs[opp] == me) {
            // if you tie
            res += 3;
        }
        // no points for losing
    }
    return res;
};

let part1SolutionFirstAttempt = part1FirstAttempt(input);

console.log(part1SolutionFirstAttempt);

let part2FirstAttempt = (input) => {
    let res = 0;
    let pointsForResult = { X: 0, Y: 3, Z: 6 };
    for (let i = 0; i < input.length - 1; i++) {
        let [opp, me] = input[i].split(" ");
        res += pointsForResult[me];
        if (me == "X") {
            let test = { A: 3, B: 1, C: 2 };
            res += test[opp];
        } else if (me == "Y") {
            let test = { A: 1, B: 2, C: 3 };
            res += test[opp];
        } else {
            let test = { A: 2, B: 3, C: 1 };
            res += test[opp];
        }
    }
    return res;
};

let part2SolutionFirstAttempt = part2FirstAttempt(input);

console.log(part2SolutionFirstAttempt);

// Below is the solution I written without time constraints
// and with some level of organization in mind
const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSOR = "SCISSOR";
const WIN = "WIN";
const TIE = "TIE";
const LOSE = "LOSE";
const oppCharToChoice = {
    A: ROCK,
    B: PAPER,
    C: SCISSOR,
};
const winObj = { ROCK: SCISSOR, PAPER: ROCK, SCISSOR: PAPER };
const loseObj = { SCISSOR: ROCK, ROCK: PAPER, PAPER: SCISSOR };
const pointsForChoice = { ROCK: 1, PAPER: 2, SCISSOR: 3 };
const pointsForResult = { WIN: 6, TIE: 3, LOSE: 0 };

let part1Clean = (input) => {
    let points = 0;
    const myCharToChoice = { X: ROCK, Y: PAPER, Z: SCISSOR };
    for (let i = 0; i < input.length - 1; i++) {
        const [opp, me] = input[i].split(" ");
        const oppChoice = oppCharToChoice[opp];
        const myChoice = myCharToChoice[me];
        points += pointsForChoice[myChoice];

        let result;
        if (winObj[myChoice] == oppChoice) result = WIN;
        else if (myChoice == oppChoice) result = TIE;
        else result = LOSE;
        points += pointsForResult[result];
    }
    return points;
};

let part2Clean = (input) => {
    let points = 0;
    const myCharToChoice = { X: LOSE, Y: TIE, Z: WIN };

    for (let i = 0; i < input.length - 1; i++) {
        const [opp, me] = input[i].split(" ");
        const oppChoice = oppCharToChoice[opp];
        const result = myCharToChoice[me];
        points += pointsForResult[result];

        let myChoice;
        if (result == LOSE) myChoice = winObj[oppChoice];
        else if (result == TIE) myChoice = oppChoice;
        else myChoice = loseObj[oppChoice];
        points += pointsForChoice[myChoice];
    }
    return points;
};

const part1SolutionClean = part1Clean(input);
console.log(part1SolutionClean);
const part2SolutionClean = part2Clean(input);
console.log(part2SolutionClean);
