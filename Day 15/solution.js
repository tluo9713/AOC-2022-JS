import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `Sensor at x=8, y=7: closest beacon is at x=2, y=10
`;
// `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
// Sensor at x=9, y=16: closest beacon is at x=10, y=16
// Sensor at x=13, y=2: closest beacon is at x=15, y=3
// Sensor at x=12, y=14: closest beacon is at x=10, y=16
// Sensor at x=10, y=20: closest beacon is at x=10, y=16
// Sensor at x=14, y=17: closest beacon is at x=10, y=16
// Sensor at x=8, y=7: closest beacon is at x=2, y=10
// Sensor at x=2, y=0: closest beacon is at x=2, y=10
// Sensor at x=0, y=11: closest beacon is at x=2, y=10
// Sensor at x=20, y=14: closest beacon is at x=25, y=17
// Sensor at x=17, y=20: closest beacon is at x=21, y=22
// Sensor at x=16, y=7: closest beacon is at x=15, y=3
// Sensor at x=14, y=3: closest beacon is at x=15, y=3
// Sensor at x=20, y=1: closest beacon is at x=15, y=3
// `;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

// dang, just another day, just another night of taking L's. originally i planned on "drawing"
// the whole thing, but after running it on the input, the ranges get unfathomably long. so it
// is not practical to draw. instead i settled for putting the ranges of ineligibility for each
// row. then i check the appropriate row for part 1, or every row for part 2 and merge intervals
// and manually cranked out the answer, so technically part 2 does not return the solution
// the run times for this is very long

let paint = (graph, sensor, closest) => {
    let [sensorX, sensorY] = sensor;
    let [closeX, closeY] = closest;
    let distance = Math.abs(sensorX - closeX) + Math.abs(sensorY - closeY) + 1;
    // lol dont even try to understand whats going on here, it makes more sense in refactor
    // form, i kind of just tried random stuff but it doesnt entirely make sense
    for (let i = sensorY - distance + 1; i <= sensorY; i++) {
        let test = i - sensorY + distance - 1;
        if (!graph[i]) graph[i] = { range: [], points: [] };
        graph[i].range.push([sensorX - test, sensorX + test]);
        if (i == sensorY) graph[i].points.push(sensorY);
        if (i == closeX) graph[i].points.push(closeY);
    }

    for (let i = sensorY + 1; i <= sensorY + distance; i++) {
        let test = sensorY + distance - i - 1;
        if (!graph[i]) graph[i] = { range: [], points: [] };
        graph[i].range.push([sensorX - test, sensorX + test]);
        if (i == sensorY) graph[i].points.push(sensorY);
        if (i == closeX) graph[i].points.push(closeY);
    }
};

let part1 = (input) => {
    let res = 0;
    let graph = {};
    for (let i = 0; i < input.length - 1; i++) {
        let el = input[i].split(":");
        let sensorX = +el[0].split(" ").at(-2).slice(2, -1);
        let sensorY = +el[0].split(" ").at(-1).slice(2);
        let closeX = +el[1].split(" ").at(-2).slice(2, -1);
        let closeY = +el[1].split(" ").at(-1).slice(2);
        paint(graph, [sensorX, sensorY], [closeX, closeY]);
    }

    // let row = graph[10];
    let row = graph[2000000];

    row.range.sort((a, b) => a[0] - b[0]);
    console.log(row.range);
    return res;
};

// const part1Solution = part1(input);
// console.log(part1Solution);

// i used my leetcode merge intervals
var merge = function (intervals) {
    let res = [];
    intervals.sort((a, b) => a[0] - b[0]);

    for (const interval of intervals) {
        if (res.length === 0) res.push(interval);
        else {
            let prev = res.pop();
            if (doIntervalsOverlap(prev, interval))
                res.push(mergeIntervals(prev, interval));
            else res.push(prev, interval);
        }
    }
    return res;
};

function doIntervalsOverlap(interval1, interval2) {
    const [start1, end1] = interval1;
    const [start2, end2] = interval2;

    // for this problem we actually need edges to be combined too
    if (Math.abs(start1 - end2) == 1) return true;
    if (Math.abs(start2 - end1) == 1) return true;
    return (start2 <= end1 && end2 >= end1) || (start1 <= end2 && end1 >= end2);
}

function mergeIntervals(interval1, interval2) {
    const [start1, end1] = interval1;
    const [start2, end2] = interval2;

    return [Math.min(start1, start2), Math.max(end1, end2)];
}

let part2 = (input) => {
    let graph = {};
    for (let i = 0; i < input.length - 1; i++) {
        console.log(i);
        let el = input[i].split(":");
        let sensorX = +el[0].split(" ").at(-2).slice(2, -1);
        let sensorY = +el[0].split(" ").at(-1).slice(2);
        let closeX = +el[1].split(" ").at(-2).slice(2, -1);
        let closeY = +el[1].split(" ").at(-1).slice(2);
        paint(graph, [sensorX, sensorY], [closeX, closeY]);
    }

    // let row = graph[10];
    for (let key in graph) {
        let arr = graph[key];
        // for (let point of graph[key].points) {
        //     arr.push([point, point]);
        // }
        let mergedArr = merge(arr);
        if (key < 0 || key > 4000000) continue;
        if (mergedArr.length != 1) {
            console.log(key);
            console.log(JSON.stringify(mergedArr));
        }
    }
};

// const part2Solution = part2(input);
// console.log(part2Solution);
// console.log(3334479 * 4000000 + 3186981); solution
// console.log(14 * 4000000 + 11);
// part 1 5256611, part 2 13337919186981

// the logic remains the same, we're just cleaning some stuff and fixing some logic

const paintRefactor = (graph, sensor, beacon) => {
    const [sensorX, sensorY] = sensor;
    const [beaconX, beaconY] = beacon;
    const distance = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);

    for (let x = sensorY - distance; x < sensorY; x++) {
        const range = x - sensorY + distance;
        if (!graph[x]) graph[x] = [];
        graph[x].push([sensorX - range, sensorX + range]);
    }

    for (let x = sensorY; x <= sensorY + distance; x++) {
        const range = sensorY + distance - x;
        if (!graph[x]) graph[x] = [];
        graph[x].push([sensorX - range, sensorX + range]);
    }
};

const processInput = (input) => {
    const graph = {};
    for (let i = 0; i < input.length - 1; i++) {
        let [sensor, closest] = input[i].split(":");
        let [_sensor, _at, sensorX, sensorY] = sensor.split(" ");
        sensorX = Number(sensorX.slice(2, -1));
        sensorY = Number(sensorY.slice(2));
        let [_, _closest, _beacon, _is, _at2, beaconX, beaconY] =
            closest.split(" ");
        beaconX = Number(beaconX.slice(2, -1));
        beaconY = Number(beaconY.slice(2));

        paintRefactor(graph, [sensorX, sensorY], [beaconX, beaconY]);
    }
    return graph;
};

const mergeIntervalsRefactor = (intervalA, intervalB) => {
    const [startA, endA] = intervalA;
    const [_, endB] = intervalB;

    return [startA, Math.max(endA, endB)];
};

const doWeMerge = (intervalA, intervalB) => {
    // we expect intervals to be sorted, so we can take advantage of that such as
    // we always know startA <= startB
    const [_a, endA] = intervalA;
    const [startB, _b] = intervalB;

    // if intervals are back to back we should merge
    if (endA + 1 == startB) return true;
    // if intervals overlap
    if (startB <= endA) return true;
    return false;
};

const mergeRefactor = (intervals) => {
    intervals.sort((a, b) => a[0] - b[0]);
    let res = [intervals[0]];

    for (const interval of intervals) {
        let prev = res.pop();
        if (doWeMerge(prev, interval)) {
            const mergedInterval = mergeIntervalsRefactor(prev, interval);
            res.push(mergedInterval);
        } else res.push(prev, interval);
    }
    return res;
};

let part1Refactor = (graph) => {
    let res = 0;
    // const ROW_NUMBER = 10
    const ROW_NUMBER = 2000000;
    const intervals = mergeRefactor(graph[ROW_NUMBER]);
    // there's only one interval but in case there were more
    for (let [min, max] of intervals) res += max - min;
    return res;
};

const graph = processInput(input);
const part1RefactorSolution = part1Refactor(graph);
console.log(part1RefactorSolution);

let part2Refactor = (graph) => {
    let res = 0;
    const LOWER_LIMIT = 0;
    const UPPER_LIMIT = 4000000;
    const X_MULTIPLIER = 4000000;
    for (let row in graph) {
        if (row < LOWER_LIMIT || row > UPPER_LIMIT) continue;
        let arr = graph[row];
        arr = merge(arr);
        // this is a fairly hard coded solution, and understandably fails a lot of
        // edge cases, but im kind of running on fumes sooooo yah cut me some slack
        if (arr.length == 1) continue;
        let [rangeA, rangeB] = arr;

        if (rangeA[1] + 2 == rangeB[0]) {
            const x = rangeA[1] + 1;
            const y = Number(row);
            return X_MULTIPLIER * x + y;
        }
    }
    throw Error("Hmmm we may have messed up somewhere");
};

const part2RefactorSolution = part2Refactor(graph);
console.log(part2RefactorSolution);
