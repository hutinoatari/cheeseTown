import {
    basename,
    dirname,
    extname,
    join,
} from "https://deno.land/std@0.131.0/path/mod.ts";
import { cheeseTownToHtml } from "./cheeseTown.ts";

const inputFileName = Deno.args[0];
const outputFileName = join(
    dirname(inputFileName),
    `${basename(inputFileName, extname(inputFileName))}.html`,
);
const inputFileData = await Deno.readTextFile(inputFileName);
const outputFileData = cheeseTownToHtml(inputFileData);
await Deno.writeTextFileSync(outputFileName, outputFileData);

console.log("compile completed...");
