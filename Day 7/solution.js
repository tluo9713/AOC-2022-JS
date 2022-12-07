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
    // initial directory
    let obj = { dirName: "/" };
    // below creats file system, albeit extremely ugly, holy moly
    for (let i = 0; i < input.length - 1; i++) {
        let el = input[i];
        if (el.includes("ls")) {
            // ls will list all files and directories, so we'll take this time to create
            // the appropriate key and value (dir being objs)
            // increase i to next element
            i++;
            // as long as we havent exceeded input and the line doesnt include $ we know its
            // not our command, added dirName for troubleshooting purposes
            while (i < input.length - 1 && !input[i].includes("$")) {
                if (input[i].includes("dir")) {
                    // create dir
                    let dirName = input[i].split(" ").at(-1);
                    obj[dirName] = { parent: obj, dirName };
                } else {
                    // create file
                    const [size, filename] = input[i].split(" ");
                    obj[filename] = +size;
                }
                i++;
            }
            // end of for loop increments so we need to undo an extra increment
            i--;
            continue;
        }
        // presumably we see .. only when we're trying to get to parent directory
        if (el.includes("..")) {
            obj = obj.parent;
            continue;
        }
        // we only see this if we want to see the outermost directory
        if (el.includes("/")) {
            while (obj.dirName !== "/") obj = obj.parent;
            continue;
        }
        // if we reach this point, we are changing directories
        const name = el.split(" ").at(-1);
        obj = obj[name];
    }

    // below is a dfs function that will find the total file size of each directory
    let dfs = (obj) => {
        let total = 0;
        for (let key in obj) {
            // avoide parent and dirname as they're not relevant and for moving around
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
    // refer to notes from above
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
        return total;
    };
    while (obj.parent !== undefined) obj = obj.parent;
    // imagine having good names
    let foo = dfs(obj);
    let max = 70000000 - 30000000;
    let arr = [];
    // the logic is we need to do dfs to find the dir size that is large enough to make
    // enough room for our update, so lets add all of those directory sizes to an arr, sort it
    // and then get the smallest one
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

// what an initial solution mess, i should read the problems a bit more closely going forward
// below is a much more readable and refactored version of aboves code with a couple of tweaks
// to make functions more reusable

const createDir = (currDir, dirName) => {
    currDir[dirName] = { parent: currDir, dirName };
};

const createFile = (currDir, fileName, size) => {
    currDir[fileName] = +size;
};

let dfs = (obj) => {
    let total = 0;
    for (let key in obj) {
        // avoide parent and dirname as they're not relevant and for moving around
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
const getDirSizes = (dir, sizes) => {
    let total = 0;
    for (let name in dir) {
        // avoid parent and dirname as they're not relevant and for moving around
        if (name == "parent") continue;
        if (name == "dirName") continue;
        if (typeof dir[name] == "number") {
            total += dir[name];
        } else {
            // if not a number type, its an obj which denotes another dir, we recursively
            // call getDirSize on that dir
            const count = getDirSizes(dir[name], sizes);
            total += count;
        }
    }
    sizes.push(total);
    return total;
};

const parseDataForFileSystem = (input) => {
    const rootFileSystem = { dirName: "/" };
    let currDir = rootFileSystem;
    for (let line of input) {
        // we do not technically process the ls line because there is nothing to do
        if (line == "$ ls") continue;
        // if line includes dir, dir only shows up after a ls command, so we should create this
        // directory
        if (line.includes("dir")) {
            const [_dir, dirName] = line.split(" ");
            createDir(currDir, dirName);
            continue;
        }
        // if it doesnt include $, its still listing off files and dirs, but the above conditional
        // takes care of all dir, so this must be a file
        if (!line.includes("$")) {
            const [size, fileName] = line.split(" ");
            createFile(currDir, fileName, Number(size));
            continue;
        }
        // presumably we see ".." only when we're trying to get to parent directory
        if (line.includes("..")) {
            currDir = currDir.parent;
            continue;
        }
        // we only see this if we want to see the outermost directory
        if (line.includes("/")) {
            currDir = rootFileSystem;
            continue;
        }
        // if we reach this point, we are changing directories
        if (line.includes("cd")) {
            const [_$, _cd, dirName] = line.split(" ");
            currDir = currDir[dirName];
        }
    }
    return rootFileSystem;
};

let part1Clean = (input) => {
    let res = 0;
    const rootFileSystem = parseDataForFileSystem(input);
    const dirSizes = [];
    getDirSizes(rootFileSystem, dirSizes);
    const PART_1_SIZE = 100000;
    for (let size of dirSizes) if (size < PART_1_SIZE) res += size;
    return res;
};

const part1CleanSolution = part1Clean(input);
console.log(part1CleanSolution);

let part2Clean = (input) => {
    const rootFileSystem = parseDataForFileSystem(input);
    const dirSizes = [];
    const CURR_OCCUPIED_DISK_SPACE = getDirSizes(rootFileSystem, dirSizes);
    const TOTAL_DISK_SPACE = 70000000;
    const SPACE_REQUIRED_FOR_UPDATE = 30000000;
    const MAXIMUM_DISK_SPACE_ALLOWED_TO_UPDATE =
        TOTAL_DISK_SPACE - SPACE_REQUIRED_FOR_UPDATE;
    const MIN_DISK_SPACE_TO_DELETE =
        CURR_OCCUPIED_DISK_SPACE - MAXIMUM_DISK_SPACE_ALLOWED_TO_UPDATE;

    // sorted and then check from lowest to highest, but alternatively for faster results we
    // could do binary search. however, since we already had to build and traverse the filesystem
    // the time complexity does not change over all
    dirSizes.sort((a, b) => a - b);
    for (let size of dirSizes) {
        if (size >= MIN_DISK_SPACE_TO_DELETE) return size;
    }
    throw Error(
        "Did not find any directories that could be removed to install update!"
    );
};

const part2CleanSolution = part2Clean(input);
console.log(part2CleanSolution);
