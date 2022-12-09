import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

// i feel like i hardcoded this section, could make it much simpler im sure
const tailHelper = (head, tail) => {
    if (Math.abs(head[0] - tail[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1)
        return tail;
    // if head moves and tail
    // if head is only 2 away in either  the x or y direction but not both, we just need
    // know which direction we have to move the tail once
    if (head[0] == tail[0] + 2 && head[1] == tail[1])
        return [tail[0] + 1, tail[1]];
    if (head[0] == tail[0] - 2 && head[1] == tail[1])
        return [tail[0] - 1, tail[1]];
    if (head[1] == tail[1] + 2 && head[0] == tail[0])
        return [tail[0], tail[1] + 1];
    if (head[1] == tail[1] - 2 && head[0] == tail[0])
        return [tail[0], tail[1] - 1];
    // at this point we are dealing with diagonals so we move x and y once so tail is closer to
    // head
    let tailX = tail[0];
    let tailY = tail[1];

    if (head[0] < tailX) tailX--;
    else tailX++;
    if (head[1] < tailY) tailY--;
    else tailY++;
    return [tailX, tailY];
};

let part1 = (input) => {
    let dir = { R: [0, 1], L: [0, -1], U: [-1, 0], D: [1, 0] };
    let head = [0, 0];

    let tail = [0, 0];
    let set = new Set();
    set.add(tail.join(","));
    for (let i = 0; i < input.length - 1; i++) {
        let [direction, count] = input[i].split(" ");
        let [x, y] = dir[direction];
        count = +count;
        while (count) {
            let [headX, headY] = head;
            head = [headX + x, headY + y];
            tail = tailHelper(head, tail);
            set.add(tail.join(","));
            count--;
        }
    }
    return set.size;
};

let part2 = (input) => {
    let dir = { R: [0, 1], L: [0, -1], U: [-1, 0], D: [1, 0] };
    let rope = [];
    for (let i = 0; i < 10; i++) rope.push([0, 0]);
    let set = new Set();
    set.add("0,0");
    for (let i = 0; i < input.length - 1; i++) {
        let [direction, count] = input[i].split(" ");
        let [x, y] = dir[direction];
        count = +count;
        while (count) {
            for (let j = 0; j < rope.length - 1; j++) {
                let head = rope[j];
                let tail = rope[j + 1];
                let [headX, headY] = head;
                if (j == 0) {
                    rope[j] = [headX + x, headY + y];
                    head = rope[j];
                }
                tail = tailHelper(head, tail);
                rope[j + 1] = tail;
                if (j == 8) set.add(tail.join(","));
            }
            count--;
        }
    }
    return set.size;
};

const part1Solution = part1(input);
console.log(part1Solution);

const part2Solution = part2(input);
console.log(part2Solution);

// just make it cleaner to be honest

const moveTail = (head, tail) => {
    const [headX, headY] = head;
    let [tailX, tailY] = tail;
    // if head is not far enough away from tail, we dont move at all
    if (Math.abs(headX - tailX) <= 1 && Math.abs(headY - tailY) <= 1)
        return tail;

    // if tail only needs to move one direction once
    const tailDoesNotMoveX = headX == tailX;
    const tailDoesNotMoveY = headY == tailY;

    if (headY == tailY + 2 && tailDoesNotMoveX) return [tailX, tailY + 1];
    if (headY == tailY - 2 && tailDoesNotMoveX) return [tailX, tailY - 1];
    if (headX == tailX + 2 && tailDoesNotMoveY) return [tailX + 1, tailY];
    if (headX == tailX - 2 && tailDoesNotMoveY) return [tailX - 1, tailY];

    // at this point we are dealing with diagonals so we move x and y once so tail is closer to
    // head
    tailX += headX < tailX ? -1 : 1;
    tailY += headY < tailY ? -1 : 1;
    return [tailX, tailY];
};

const dir = { R: [0, 1], L: [0, -1], U: [-1, 0], D: [1, 0] };
const moveWholeRope = (rope) => {
    for (let i = 0; i < rope.length - 1; i++) {
        let head = rope[i];
        let tail = rope[i + 1];
        tail = moveTail(head, tail);
        rope[i + 1] = tail;
    }
    return rope;
};

const getTailPositionsVisited = (input, ropeLength) => {
    const rope = [];
    for (let i = 0; i < ropeLength; i++) rope.push([0, 0]);
    const visitedPositions = new Set(["0,0"]);
    for (let i = 0; i < input.length - 1; i++) {
        let [direction, count] = input[i].split(" ");
        let [x, y] = dir[direction];
        count = Number(count);
        for (let j = 0; j < count; j++) {
            // move head
            const head = rope[0];
            head[0] += x;
            head[1] += y;
            // move rope
            moveWholeRope(rope);
            // add to set
            const tailPosiition = rope.at(-1);
            visitedPositions.add(tailPosiition.join(","));
        }
    }
    return visitedPositions.size;
};

const part1Refactor = (input) => {
    const res = getTailPositionsVisited(input, 2);
    return res;
};

const part1RefactorSolution = part1Refactor(input);
console.log(part1RefactorSolution);

const part2Refactor = (input) => {
    const res = getTailPositionsVisited(input, 10);
    return res;
};

const part2RefactorSolution = part2Refactor(input);
console.log(part2RefactorSolution);
