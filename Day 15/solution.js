import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3
`;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

let paint = (graph, sensor, closest) => {
    let [sensorX, sensorY] = sensor;
    let [closeX, closeY] = closest;
    let distance = Math.abs(sensorX - closeX) + Math.abs(sensorY - closeY) + 1;
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

// let part1 = (input) => {
//     let res = 0;
//     let graph = {};
//     for (let i = 0; i < input.length - 1; i++) {
//         console.log(i);
//         let el = input[i].split(":");
//         let sensorX = +el[0].split(" ").at(-2).slice(2, -1);
//         let sensorY = +el[0].split(" ").at(-1).slice(2);
//         let closeX = +el[1].split(" ").at(-2).slice(2, -1);
//         let closeY = +el[1].split(" ").at(-1).slice(2);
//         paint(graph, [sensorX, sensorY], [closeX, closeY]);
//     }

//     // let row = graph[10];
//     let row = graph[11];

//     row.range.sort((a, b) => a[0] - b[0]);
//     console.log(row.range);
//     return res;
// };

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
    let res = 0;
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
    console.log(Object.keys(graph).length);
    console.log("the answer");
    for (let key in graph) {
        let arr = graph[key].range;
        for (let point of graph[key].points) {
            arr.push([point, point]);
        }
        let mergedArr = merge(arr);
        if (key < 0 || key > 4000000) continue;
        if (mergedArr.length != 1) {
            console.log(key);
            console.log(JSON.stringify(mergedArr));
        }
    }
    return res;
};

const part2Solution = part2(input);
console.log(part2Solution);
// console.log(3334479 * 4000000 + 3186981); solution
// console.log(14 * 4000000 + 11);
