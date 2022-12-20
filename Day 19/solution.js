import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.
`;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

let test = {
    10: [
        [1, 3, 0, 0],
        [4, 15, 0, 0],
    ],
    11: [
        [1, 3, 1, 0],
        [2, 4, 0, 0],
    ],
    13: [
        [1, 4, 1, 0],
        [2, 11, 2, 0],
    ],
    14: [
        [1, 4, 1, 0],
        [3, 15, 3, 0],
    ],
    15: [
        [1, 4, 2, 0],
        [1, 5, 4, 0],
    ],
};

// const helper = (costs) => {
//     let max = 0
//     let endTime = 24
//     const dfs (time, robotCount, resources) => {
//         if (time == endTime) {
//             max = Math.max(max, resources[3])
//         }
//         let [ore, clay, obs, geo] = resources;
//         let timeLeft = endTime - time
//         if (timeLeft)
//     }
// }/

const bfs = (costs, idx) => {
    const [oreCost, clayCost, obsCost, geoCost] = costs;
    let max = Math.max(oreCost, clayCost, obsCost[0], geoCost[0]);
    // console.log(JSON.stringify(costs));
    let maxGeode = 0;
    let queue = [[0, [1, 0, 0, 0], [0, 0, 0, 0], false]];
    let obj = {};
    const endTime = 24;
    while (queue.length) {
        let [time, robotCount, resources, builtPreviously] = queue.shift();
        console.log(idx);
        // console.log(time, maxGeode);
        let timeLeft = endTime - time;
        // console.log(
        //     time,
        //     JSON.stringify(robotCount),
        //     JSON.stringify(resources)
        // );
        // console.log(time);
        // if (
        //     time == 11 &&
        //     JSON.stringify(robotCount) == JSON.stringify(test[time][0]) &&
        //     JSON.stringify(resources) == JSON.stringify(test[time][1])
        // ) {
        //     console.log(
        //         time,
        //         JSON.stringify(robotCount),
        //         JSON.stringify(resources)
        //     );
        //     console.log("test");
        // }

        // if (time == 19) {
        //     console.log(
        //         time,
        //         JSON.stringify(robotCount),
        //         JSON.stringify(resources),
        //         builtPreviously
        //     );

        //     3 + 3;
        // }

        // if at this time, we seen this amount of robots and this amount
        // of resources, we can just skip it because its redundant to
        // add to the queue
        if (!obj[time]) obj[time] = {};
        let str = JSON.stringify(robotCount);
        if (!obj[time][str]) obj[time][str] = new Set();
        if (obj[time][str].has(JSON.stringify(resources))) continue;
        obj[time][str].add(JSON.stringify(resources));
        if (time == endTime) continue;

        let [oreRob, clayRob, obsRob, geoRob] = robotCount;

        // we'll never need more than a certain amount of robots
        // if (oreRob > Math.max(clayCost, obsCost[0], geoCost[0])) continue;
        // if (clayRob > obsCost[1]) continue;
        // if (obsRob > geoCost[1]) continue;

        let [ore, clay, obs, geo] = resources;
        // if (ore >= 7) continue;
        let canAffordOre = ore >= oreCost;
        let canAffordClay = ore >= clayCost;
        let canAffordObs = ore >= obsCost[0] && clay >= obsCost[1];
        let canAffordGeo = ore >= geoCost[0] && obs >= geoCost[1];

        ore += oreRob;
        clay += clayRob;
        obs += obsRob;
        geo += geoRob;
        // if (geo > maxGeode) {
        //     console.log(
        //         time,
        //         maxGeode,
        //         geo,
        //         JSON.stringify(robotCount),
        //         JSON.stringify([ore, clay, obs, geo])
        //     );
        //     if (geo == 9) {
        //         console.log("ding ding");
        //     }
        // }
        maxGeode = Math.max(geo, maxGeode);
        // dont spend
        // if we can afford to make everything, and we didnt make anything last
        // minute, we should consider making something instead and this path
        // is dead
        // if (
        //     !canAffordAll ||
        //     builtPreviously //||
        //     // (!canAffordClay && !canAffordOre) ||
        //     // (!canAffordObs && clayRob) ||
        //     // (!canAffordGeo && obsRob)
        // ) {
        //     // if we remove, edge case : we can't afford to make anything, but we should stil
        //     // be added to the queue so we can tick the
        //     queue.push([
        //         time + 1,
        //         [oreRob, clayRob, obsRob, geoRob],
        //         [ore, clay, obs, geo],
        //         false,
        //     ]);
        // }
        let savingForObs = !canAffordObs && clayRob;
        let savingForGeo = !canAffordGeo && obsRob;

        // if (canAffordGeo || canAffordObs) {

        // if (!canAffordObs) continue;

        // }
        // problem, sometimes we end up saving for something, like obs, and we have
        // clayrobot, but we only have 1 and the cost is like .... 15. so now we have
        // wait 15 days and this makes it awful for that
        if (
            !canAffordOre ||
            !canAffordClay ||
            savingForObs ||
            savingForGeo ||
            geoRob
        ) {
            // if we're saving for Ore/clay/obs/geo robot, we can save
            queue.push([
                time + 1,
                [oreRob, clayRob, obsRob, geoRob],
                [ore, clay, obs, geo],
                false,
            ]);
        }
        if (canAffordOre && ore < timeLeft * (max - oreRob)) {
            // buy ore robot
            queue.push([
                time + 1,
                [oreRob + 1, clayRob, obsRob, geoRob],
                [ore - oreCost, clay, obs, geo],
                true,
            ]);
        }
        if (canAffordClay && clay < timeLeft * (obsCost[1] - clayRob)) {
            // buy clay robot
            queue.push([
                time + 1,
                [oreRob, clayRob + 1, obsRob, geoRob],
                [ore - clayCost, clay, obs, geo],
                true,
            ]);
        }
        if (canAffordObs && obs < timeLeft * (geoCost[1] - obsRob)) {
            // buy obs robot
            queue.push([
                time + 1,
                [oreRob, clayRob, obsRob + 1, geoRob],
                [ore - obsCost[0], clay - obsCost[1], obs, geo],
                true,
            ]);
            // continue;
        }
        if (canAffordGeo) {
            // buy geo robot
            queue.push([
                time + 1,
                [oreRob, clayRob, obsRob, geoRob + 1],
                [ore - geoCost[0], clay, obs - geoCost[1], geo],
                true,
            ]);
            // continue;
        }
    }
    return maxGeode;
};

let part1 = (input) => {
    let res = 0;
    let robotCost = [];
    for (let i = 0; i < input.length - 1; i++) {
        let el = input[i].split(" ");
        let oreRobot = +el[6];
        let clayRobot = +el[12];
        let obsidianRobot = [+el[18], +el[21]];
        let geodeRobot = [+el[27], +el[30]];
        robotCost.push([oreRobot, clayRobot, obsidianRobot, geodeRobot]);
    }

    // bfs each one
    // for (let i = 0; i < robotCost.length - 1; i++) {
    // for (let i = 1; i < robotCost.length; i++) {
    for (let i = 0; i < robotCost.length; i++) {
        let t0 = performance.now();
        let geo = bfs(robotCost[i], i);
        let t1 = performance.now();

        console.log(i + 1, geo, t1 - t0);
        res += (i + 1) * geo;
    }
    // for (let i = 0; i < PLACEHOLDER; i++) {}
    return res;
};

const part1Solution = part1(input);
console.log(part1Solution);
// tried 1170
// const part2Solution = part2(input);
// console.log(part2Solution);
