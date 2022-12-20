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
    let xPoints = new Set();
    let yPoints = new Set();
    let zPoints = new Set();
    for (let i = 0; i < input.length - 1; i++) {
        let [x, y, z] = input[i].split(",");
        res += 6;
        for (let i = 0; i <= 1; i++) {
            let str = [+x + i, y, z].join(",");
            console.log(str);
            if (xPoints.has(str)) {
                console.log(input[i], "has ", str);
                res -= 2;
            }
            xPoints.add(str);
        }
        for (let i = 0; i <= 1; i++) {
            let str = [x, +y + i, z].join(",");
            console.log(str);
            if (yPoints.has(str)) {
                console.log(input[i], "has ", str);
                res -= 2;
            }
            yPoints.add(str);
        }
        for (let i = 0; i <= 1; i++) {
            let str = [x, y, +z + i].join(",");
            console.log(str);
            if (zPoints.has(str)) {
                console.log(input[i], "has ", str);

                res -= 2;
            }
            zPoints.add(str);
        }
    }
    // keep track of furthest dimensions in x y z
    // dfs looking if we can reach beyond dimension
    // if yes, put in whatever set that it is not trapped
    // we have to do this for every side that isnt already blocked
    // maybe another set to see what is already blocked
    let x2 = new Set();
    let y2 = new Set();
    let z2 = new Set();
    for (let i = 0; i < input.length - 1; i++) {
        let [x, y, z] = input[i].split(",");
        res += 6;
        for (let i = 0; i <= 1; i++) {
            let str = [+x + i, y, z].join(",");
            console.log(str);
            if (xPoints.has(str)) {
                console.log(input[i], "has ", str);
                res -= 2;
            }
            xPoints.add(str);
        }
        for (let i = 0; i <= 1; i++) {
            let str = [x, +y + i, z].join(",");
            console.log(str);
            if (yPoints.has(str)) {
                console.log(input[i], "has ", str);
                res -= 2;
            }
            yPoints.add(str);
        }
        for (let i = 0; i <= 1; i++) {
            let str = [x, y, +z + i].join(",");
            console.log(str);
            if (zPoints.has(str)) {
                console.log(input[i], "has ", str);

                res -= 2;
            }
            zPoints.add(str);
        }
    }

    return res;
};

// const part2Solution = part2(input);
// console.log(part2Solution);
