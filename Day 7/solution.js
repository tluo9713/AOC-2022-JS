import rawInput from "./input.js";
import { newLineSplitter } from "../Utils/utils.js";

const sampleInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`;
// process raw input
let input = newLineSplitter(sampleInput);
input = newLineSplitter(rawInput);

let part1 = (input) => {
    let res = 0;
    let obj = { dirName: "/" };
    // below creats file system, albeit extremely ugly, holy moly
    for (let i = 0; i < input.length - 1; i++) {
        let el = input[i];
        if (el.includes("ls")) {
            i++;
            while (i < input.length - 1 && !input[i].includes("$")) {
                if (input[i].includes("dir")) {
                    let dirName = input[i].split(" ").at(-1);
                    obj[dirName] = { parent: obj, dirName };
                } else {
                    const [size, filename] = input[i].split(" ");
                    obj[filename] = +size;
                }

                i++;
            }
            i--;
            continue;
        }
        if (el.includes("..")) {
            obj = obj.parent;
            continue;
        }
        if (el.includes("/")) {
            while (obj.dirName !== "/") obj = obj.parent;
            continue;
        }
        const name = el.split(" ").at(-1);
        obj = obj[name];
    }

    let dfs = (obj) => {
        let total = 0;
        for (let key in obj) {
            if (key == "parent") continue;
            if (key == "dirName") continue;
            if (typeof obj[key] == "number") {
                total += obj[key];
            } else {
                let count = dfs(obj[key]);
                total += count;
            }
        }
        if (total < 100000) res += total;
        return total;
    };
    while (obj.parent !== undefined) obj = obj.parent;
    dfs(obj);
    return res;
};

const part1Solution = part1(input);
console.log(part1Solution);

let part2 = (input) => {
    let obj = { dirName: "/" };
    // below creats file system
    for (let i = 0; i < input.length - 1; i++) {
        let el = input[i];
        if (el.includes("ls")) {
            i++;
            while (i < input.length - 1 && !input[i].includes("$")) {
                if (input[i].includes("dir")) {
                    let dirName = input[i].split(" ").at(-1);
                    obj[dirName] = { parent: obj, dirName };
                } else {
                    const [size, filename] = input[i].split(" ");
                    obj[filename] = +size;
                }

                i++;
            }
            i--;
            continue;
        }
        if (el.includes("..")) {
            obj = obj.parent;
            continue;
        }
        if (el.includes("/")) {
            while (obj.dirName !== "/") obj = obj.parent;
            continue;
        }
        // will be cd into a directory
        const name = el.split(" ").at(-1);
        obj = obj[name];
    }

    let dfs = (obj) => {
        let total = 0;
        for (let key in obj) {
            if (key == "parent") continue;
            if (key == "dirName") continue;
            if (typeof obj[key] == "number") {
                total += obj[key];
            } else {
                let count = dfs(obj[key]);
                total += count;
            }
        }
        if (total < 100000) res += total;
        return total;
    };
    while (obj.parent !== undefined) obj = obj.parent;
    let foo = dfs(obj);
    let max = 70000000 - 30000000;
    let arr = [];
    let dfs2 = (obj) => {
        let total = 0;
        for (let key in obj) {
            if (key == "parent") continue;
            if (key == "dirName") continue;
            if (typeof obj[key] == "number") {
                total += obj[key];
            } else {
                let count = dfs2(obj[key]);
                total += count;
            }
        }
        if (foo - total < max) arr.push(total);
        return total;
    };
    dfs2(obj);
    arr.sort((a, b) => b - a);
    return arr.pop();
};

const part2Solution = part2(input);
console.log(part2Solution);
