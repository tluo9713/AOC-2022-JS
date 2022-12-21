import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5
`;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

// let part1 = (input) => {
//     let res = 0;
//     let xPoints = new Set();
//     let yPoints = new Set();
//     let zPoints = new Set();
//     for (let i = 0; i < input.length - 1; i++) {
//         let [x, y, z] = input[i].split(",");
//         res += 6;
//         for (let i = 0; i <= 1; i++) {
//             let str = [+x + i, y, z].join(",");
//             console.log(str);
//             if (xPoints.has(str)) {
//                 console.log(input[i], "has ", str);
//                 res -= 2;
//             }
//             xPoints.add(str);
//         }
//         for (let i = 0; i <= 1; i++) {
//             let str = [x, +y + i, z].join(",");
//             console.log(str);
//             if (yPoints.has(str)) {
//                 console.log(input[i], "has ", str);
//                 res -= 2;
//             }
//             yPoints.add(str);
//         }
//         for (let i = 0; i <= 1; i++) {
//             let str = [x, y, +z + i].join(",");
//             console.log(str);
//             if (zPoints.has(str)) {
//                 console.log(input[i], "has ", str);

//                 res -= 2;
//             }
//             zPoints.add(str);
//         }
//     }
//     return res;
// };

// const part1Solution = part1(input);
// console.log(part1Solution);

let part2 = (input) => {
    let res = 0;
    let xPoints = {};
    let yPoints = {};
    let zPoints = {};
    let xMin = Infinity;
    let xMax = -Infinity;
    let yMin = Infinity;
    let yMax = -Infinity;
    let zMin = Infinity;
    let zMax = -Infinity;
    for (let i = 0; i < input.length - 1; i++) {
        let [x, y, z] = input[i].split(",");
        xMin = Math.min(xMin, x);
        xMax = Math.max(xMax, x);
        yMin = Math.min(yMin, y);
        yMax = Math.max(yMax, y);
        zMin = Math.min(zMin, z);
        zMax = Math.max(zMax, z);
        // console.log("input", input[i], x, y, z);
        res += 6;
        for (let j = 0; j <= 1; j++) {
            let str = [+x + j, y, z].join(",");
            if (xPoints[str]) res -= 2;
            if (!xPoints[str]) xPoints[str] = 0;
            xPoints[str]++;
        }
        for (let j = 0; j <= 1; j++) {
            let str = [x, +y + j, z].join(",");
            if (yPoints[str]) res -= 2;
            if (!yPoints[str]) yPoints[str] = 0;
            yPoints[str]++;
        }
        // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
        for (let j = 0; j <= 1; j++) {
            let str = [x, y, +z + j].join(",");
            // if (input[i] == "2,2,6") {
            //     console.log("LOOKIE", str);
            // }
            // console.log("hi", input[i], "vars", x, y, z, "str", str);
            if (zPoints[str]) res -= 2;
            if (!zPoints[str]) zPoints[str] = 0;
            // if (str == "2,2,4") {
            //     console.log(" wtf", input[i], x, y, z);
            // }
            zPoints[str]++;
        }
    }
    // keep track of furthest dimensions in x y z
    // dfs looking if we can reach beyond dimension
    // if yes, put in whatever set that it is not trapped
    // we have to do this for every side that isnt already blocked
    // maybe another set to see what is already blocked
    // LOL after finishing this problem, this was annoying
    // logic is basically we'll dfs from every side and
    // check if we can reach "outside" the minmax from each
    // side. if we can, that side is safe, but if we can't
    // and we counted that side before, we just subtract it
    const obj = { x: xPoints, y: yPoints, z: zPoints };
    const dfs = (coord, side, set = new Set(), start = false) => {
        let [x, y, z] = coord.split(",");
        let curr = `${side},${coord}`;
        if (set.has(curr)) {
            return false;
        }
        set.add(curr);

        if (+x > xMax + 1 || +y > yMax + 1 || +z > zMax + 1) {
            // console.log("beyond max");
            return true;
        }
        if (+x < xMin || +y < yMin || +z < zMin) {
            // console.log("beyond min");
            return true;
        }

        if (obj[side][coord] == 2 && start) {
            return false;
        }

        if (obj[side][coord] >= 1 && !start) {
            return false;
        }
        // else we should keep expanding
        if (side == "x") {
            for (let i = -1; i <= 1; i++) {
                let str = [+x + i, y, z].join(",");
                if (dfs(str, "x", set)) return true;
            }
            for (let i = -1; i <= 0; i++) {
                for (let j = 0; j <= 1; j++) {
                    let str = [+x + i, +y + j, z].join(",");
                    if (dfs(str, "y", set)) return true;
                }
            }
            for (let i = -1; i <= 0; i++) {
                for (let j = 0; j <= 1; j++) {
                    let str = [+x + i, y, +z + j].join(",");
                    if (dfs(str, "z", set)) return true;
                }
            }
        } else if (side == "y") {
            for (let i = -1; i <= 0; i++) {
                for (let j = 0; j <= 1; j++) {
                    let str = [+x + j, +y + i, z].join(",");
                    if (dfs(str, "x", set)) return true;
                }
            }
            for (let i = -1; i <= 1; i++) {
                let str = [x, +y + i, z].join(",");
                if (dfs(str, "y", set)) return true;
            }
            for (let i = -1; i <= 0; i++) {
                for (let j = 0; j <= 1; j++) {
                    let str = [x, +y + i, +z + j].join(",");
                    if (dfs(str, "z", set)) return true;
                }
            }
        } else if (side == "z") {
            for (let i = -1; i <= 0; i++) {
                for (let j = 0; j <= 1; j++) {
                    let str = [+x + j, y, +z + i].join(",");
                    if (dfs(str, "x", set)) return true;
                }
            }
            for (let i = -1; i <= 0; i++) {
                for (let j = 0; j <= 1; j++) {
                    let str = [x, +y + j, +z + i].join(",");
                    if (dfs(str, "y", set)) return true;
                }
            }
            for (let i = -1; i <= 1; i++) {
                let str = [x, y, +z + i].join(",");
                if (dfs(str, "z", set)) return true;
            }
        }

        return false;
    };
    // console.log(zPoints);
    for (let i = 0; i < input.length - 1; i++) {
        let [x, y, z] = input[i].split(",");
        let x0 = [x, y, z].join(",");
        let x1 = [+x + 1, y, z].join(",");

        if (obj["x"][x0] == 1 && !dfs(x0, "x", new Set(), true)) {
            res--;
        }
        if (obj["x"][x1] == 1 && !dfs(x1, "x", new Set(), true)) {
            res--;
        }

        let y0 = [x, y, z].join(",");
        let y1 = [x, +y + 1, z].join(",");
        if (obj["y"][y0] == 1 && !dfs(y0, "y", new Set(), true)) {
            res--;
        }
        if (obj["y"][y1] == 1 && !dfs(y1, "y", new Set(), true)) {
            res--;
        }

        let z0 = [x, y, z].join(",");
        let z1 = [x, y, +z + 1].join(",");
        if (obj["z"][z0] == 1 && !dfs(z0, "z", new Set(), true)) {
            res--;
        }
        if (obj["z"][z1] == 1 && !dfs(z1, "z", new Set(), true)) {
            res--;
        }
    }

    return res;
};

const part2Solution = part2(input);
console.log(part2Solution);

// gonna keep it real here homie, idk if ill refactor it. i mean
// if i do, cool but idk whats the better way, maybe have some
// set that stores previous calculations so we dont redo?
