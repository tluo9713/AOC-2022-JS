import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { token } from "../secrets.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

// copied code from https://github.com/toblu/advent-of-code-client
// i just wanted to have my own simple script that grabs the data and writes it to a file
// so i can take a look at the data myself, in case it gives me some idea
const HOST_URI = "https://adventofcode.com";
const TOO_EARLY_REQUEST_TEXT =
    "please don't repeatedly request this endpoint before it unlocks";
const UNAUTHENTICATED_INPUT_TEXT = "please log in to get your puzzle input";
const INTERNAL_SERVER_ERROR_TEXT = "internal server error";
const HTML_RESPONSE_TEXT = "!DOCTYPE HTML";
const fetchFromAoC = async (uri, options) => {
    const response = await fetch(uri, options);
    return response.text();
};

let getInput = async (config) => {
    const { year, day, token } = config;
    const uri = `${HOST_URI}/${year}/day/${day}/input`;
    const options = {
        method: "get",
        headers: {
            "Content-Type": "text/plain",
            Cookie: `session=${token}`,
        },
    };

    const textResponse = await fetchFromAoC(uri, options);

    if (textResponse.toLowerCase().includes(UNAUTHENTICATED_INPUT_TEXT)) {
        return Promise.reject(
            new Error(
                "You must log in to get your puzzle input, please provide a valid token"
            )
        );
    }
    if (textResponse.toLowerCase().includes(TOO_EARLY_REQUEST_TEXT)) {
        return Promise.reject(
            new Error(
                "This puzzle has not opened yet, please wait until the puzzle unlocks!"
            )
        );
    }

    if (textResponse.toLowerCase().includes(INTERNAL_SERVER_ERROR_TEXT)) {
        return Promise.reject(
            new Error(
                "An unexpected error occurred while fetching the input, internal server error."
            )
        );
    }

    if (textResponse.includes(HTML_RESPONSE_TEXT)) {
        return Promise.reject(
            new Error(
                "An error occurred while fetching the input. Are you authenticated correctly?"
            )
        );
    }

    if (config.useCache && !cache.get(cacheKey)) {
        // update cache if it had not been set previously
        cache.set(cacheKey, textResponse);
    }
    return textResponse;
};
// BEFORE RUNNING THIS, MAKE SURE TOKEN YEAR DAY IS CORRECT AND THEN DATA WILL BE WRITTEN TO
// THE CORRESPONDING DAY FOLDER IN AN INPUT TEXT FILE
// =================== LITERALLY RUN THIS AND THEN CLOSE THE FILE ==========================
const year = 2022;
const day = 5;
const config = { year, day, token };
// ABOVE HERE

let res = await getInput(config);

try {
    const fileName = `${__dirname}/Day ${day}/input.txt`;
    await fs.writeFile(
        `${__dirname}/Day ${day}/input.txt`,
        res,
        (err) => err && console.error(err)
    );
    console.log(`Completed writing to ${fileName}`);
} catch (error) {
    console.log(error);
}
