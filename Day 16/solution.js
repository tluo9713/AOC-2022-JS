import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II
`;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

// BEHOLD, MY GREAT MONSTROUSITY. again, this is my initial approach and should not
// really be looked at because its awful, logic is hard to parse, code is WET af
// and part 2 is not optimal and perhaps even luck that i happen to complete it.
// will eventually work on a more optimal and readable solution

const processInput = (input) => {
    let graph = {};
    let flow = {};
    let seen = new Set();
    let maxFlow = 0;

    for (let i = 0; i < input.length - 1; i++) {
        let line = input[i].split(" ");
        let startValve = line[1];
        if (!graph[startValve]) graph[startValve] = {};
        const rate = Number(line[4].slice(5, -1));
        flow[startValve] = rate;
        maxFlow += rate;
        seen.add(startValve);
        for (let j = line.length - 1; j >= 0; j--) {
            let word = line[j];
            if (word.includes("valve")) break;
            graph[startValve][word.slice(0, 2)] = 1;
        }
    }
    return [graph, flow, seen, maxFlow];
};

const connectValves = (graph, zeroFlowValve, valveA, valveB) => {
    // no circular loops
    if (valveA == valveB) return;
    let aTravelTime = graph[zeroFlowValve][valveA];
    let bTravelTime = graph[zeroFlowValve][valveB];
    let totalTravel = aTravelTime + bTravelTime;

    if (!graph[valveA][valveB]) graph[valveA][valveB] = Infinity;
    graph[valveA][valveB] = Math.min(graph[valveA][valveB], totalTravel);
    if (!graph[valveB][valveA]) graph[valveB][valveA] = Infinity;
    graph[valveB][valveA] = Math.min(graph[valveB][valveA], totalTravel);
};

const compressGraph = (graph, valve) => {
    let paths = graph[valve];
    for (let valveA in paths) {
        for (let valveB in paths) {
            connectValves(graph, valve, valveA, valveB);
        }
    }
};

const bfs = (graph, startValve) => {
    const valvesTravelTime = graph[startValve];
    const queue = [];
    for (let valve in valvesTravelTime)
        queue.push([valve, valvesTravelTime[valve]]);
    while (queue.length) {
        let [valve, travelTime] = queue.shift();
        if (valve == startValve) continue;
        if (valvesTravelTime[valve] && valvesTravelTime[valve] < travelTime)
            continue;
        valvesTravelTime[valve] = travelTime;
        for (let nextValve in graph[valve]) {
            queue.push([nextValve, travelTime + graph[valve][nextValve]]);
        }
    }
};

let part1 = (input) => {
    // major idea is to make a graph of all valves and distance to travel there as
    // well as flow of each valve. we're basically trying every combination out
    // and thats slow but what we can do is reduce the complexity of the graph
    // because some valves have a rate of 0, in otherwords they're only nodes to
    // connect to other graphs, in which case why dont we have every non 0 rate
    // valve connect to each other, and record how long it takes to traverse to
    // each other, then have another function that will always go from one valve
    // to another and always open the valve its at. believe it or not, this is
    // pretty fast
    let alpha = "AA";
    let [graph, flow, seen, maxFlow] = processInput(input);

    const valvesToDelete = [];
    for (let valve of seen) {
        if (flow[valve] != 0) continue;
        compressGraph(graph, valve);
        valvesToDelete.push(valve);
        if (valve == alpha) continue;
        seen.delete(valve);
    }

    for (let valve of valvesToDelete) {
        if (valve == alpha) continue;
        delete graph[valve];
        delete flow[valve];
    }
    for (let key in graph) {
        for (let valve of valvesToDelete) {
            delete graph[key][valve];
        }
    }
    for (let valve of seen) {
        bfs(graph, valve);
    }
    let max = 0;
    let dfs = (start, minute = 0, rate = 0, total = 0, openV = new Set()) => {
        if (rate == maxFlow) {
            total += (30 - minute) * rate;
            max = Math.max(total, max);
            return;
        }
        if (openV.has(start)) return;
        minute++;
        total += rate;
        max = Math.max(total, max);
        rate += flow[start];
        if (minute == 30) {
            return;
        }

        openV.add(start);
        for (let valve in graph[start]) {
            let travelTime = graph[start][valve];
            let currTotal = total;
            let localMinute = minute;

            while (travelTime) {
                currTotal += rate;
                localMinute++;
                if (localMinute == 30) {
                    if (currTotal > max) {
                        max = currTotal;
                    }
                    max = Math.max(currTotal, max);
                    return;
                }
                travelTime--;
            }
            dfs(valve, localMinute, rate, currTotal, new Set(openV));
        }
    };
    for (let valve in graph[alpha]) {
        let travelTime = graph[alpha][valve];
        dfs(valve, travelTime, 0, 0, new Set());
    }
    return max;
};
const part1Solution = part1(input);
console.log(part1Solution);

// lol below works but not in a great way. i just console log the max
// as it updates and check every combination, but this ends up taking
// way longer, like i got the solution and code is still running
// for 45 minutes longer. i suppose i got lucky this time that i happen
// get the right solution early?
let part2 = (input) => {
    let alpha = "AA";
    let [graph, flow, seen, maxFlow] = processInput(input);

    const valvesToDelete = [];
    for (let valve of seen) {
        if (flow[valve] != 0) continue;
        compressGraph(graph, valve);
        valvesToDelete.push(valve);
        if (valve == alpha) continue;
        seen.delete(valve);
    }

    for (let valve of valvesToDelete) {
        if (valve == alpha) continue;
        delete graph[valve];
        delete flow[valve];
    }
    for (let key in graph) {
        for (let valve of valvesToDelete) {
            delete graph[key][valve];
        }
    }
    for (let valve of seen) {
        bfs(graph, valve);
    }
    let max = 0;
    let minMinute = Infinity;
    // i tried to use bfs, so each element in the queue will handle state
    // but using shift is too slow when you run into too many possibilities
    // using index, the length is too long for an array, so i even used a
    // linked list and that was too slow in the end and didnt work
    // use dfs and keep track of state there, we'll basically try out
    // every combination possible, and use a set that will keep track
    // of every valve we're going to. theres actually an edge case that i
    // would fail sooo... just be lucky i guess
    let dfs2 = (
        valveA,
        travelTime,
        valveB,
        eTravelTime,
        minute = 0,
        rate = 0,
        total = 0,
        openV = new Set()
    ) => {
        if (rate == maxFlow) {
            total += (26 - minute) * rate;
            max = Math.max(total, max);
            minMinute = Math.min(minMinute, minute);
            return;
        }
        if (minute == 26) {
            max = Math.max(total, max);
            return;
        }
        total += rate;
        // update varaibles here?? gonna be really long, fuck
        // if travelTime != 0 && eTravelTime != 0 just count down on both
        minute++;
        if (travelTime != 0 && eTravelTime != 0) {
            travelTime--;
            eTravelTime--;
            dfs2(
                valveA,
                travelTime,
                valveB,
                eTravelTime,
                minute,
                rate,
                total,
                new Set(openV)
            );
            return;
        }
        // if travelTime == 0 && eTravelTime != 0 increase rate by valveA
        if (travelTime == 0 && eTravelTime != 0) {
            // valveA is open
            rate += flow[valveA];
            eTravelTime--;
            let count = 0;
            for (let nextValve in graph[valveA]) {
                if (openV.has(nextValve)) continue;
                travelTime = graph[valveA][nextValve];
                dfs2(
                    nextValve,
                    travelTime,
                    valveB,
                    eTravelTime,
                    minute,
                    rate,
                    total,
                    new Set([...openV, nextValve])
                );
                count++;
            }
            // what if there are no more valves to open?
            if (count == 0) {
                dfs2(
                    alpha,
                    0,
                    valveB,
                    eTravelTime,
                    minute,
                    rate,
                    total,
                    new Set(openV)
                );
            }

            return;
        }
        // if travelTime != 0 && eTravelTime == 0 increase rate by valveB
        if (travelTime != 0 && eTravelTime == 0) {
            // valveB is open
            rate += flow[valveB];
            travelTime--;
            let count = 0;
            for (let nextValve in graph[valveB]) {
                if (openV.has(nextValve)) continue;
                eTravelTime = graph[valveB][nextValve];
                dfs2(
                    valveA,
                    travelTime,
                    nextValve,
                    eTravelTime,
                    minute,
                    rate,
                    total,
                    new Set([...openV, nextValve])
                );
                count++;
            }
            if (count == 0) {
                dfs2(
                    valveA,
                    travelTime,
                    alpha,
                    0,
                    minute,
                    rate,
                    total,
                    new Set(openV)
                );
            }

            return;
        }
        // if travelTime == 0 && eTravelTime == 0 increate rate by both and nested
        // i guess this will be the only case left
        rate += flow[valveA] + flow[valveB];
        let count2 = 0;
        for (let nextValveA in graph[valveA]) {
            if (openV.has(nextValveA)) continue;
            openV.add(nextValveA);
            travelTime = graph[valveA][nextValveA];
            let count = 0;
            for (let nextValveB in graph[valveB]) {
                if (openV.has(nextValveB)) continue;
                openV.add(nextValveB);
                eTravelTime = graph[valveB][nextValveB];
                dfs2(
                    nextValveA,
                    travelTime,
                    nextValveB,
                    eTravelTime,
                    minute,
                    rate,
                    total,
                    new Set([...openV, nextValveA, nextValveB])
                );
                openV.delete(nextValveB);
                count++;
            }
            if (count == 0) {
                dfs2(
                    nextValveA,
                    travelTime,
                    alpha,
                    0,
                    minute,
                    rate,
                    total,
                    new Set([...openV, nextValveA])
                );
            }

            openV.delete(nextValveA);
            count2++;
        }
        if (count2 == 0) {
            dfs2(alpha, 0, alpha, 0, minute, rate, total, new Set([...openV]));
        }
    };

    for (let valveA in graph[alpha]) {
        let travelTime = graph[alpha][valveA];
        for (let valveB in graph[alpha]) {
            if (valveA == valveB) continue;
            let eTravelTime = graph[alpha][valveB];
            dfs2(
                valveA,
                travelTime,
                valveB,
                eTravelTime,
                0,
                0,
                0,
                new Set([valveA, valveB])
            );
        }
    }
    return max;
};
const part2Solution = part2(input);
console.log(part2Solution);
