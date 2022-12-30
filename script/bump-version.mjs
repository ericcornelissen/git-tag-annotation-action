import * as fs from "node:fs";
import * as path from "node:path";
import * as process from "node:process";

const manifestFile = path.resolve("./.version");

const manifestRaw = fs.readFileSync(manifestFile).toString();
const version = manifestRaw.trim();

const newVersion = version.split(".");
switch (process.argv[2]) {
  case "patch":
    newVersion[2] = parseInt(newVersion[2], 10) + 1;
    break;
  case "minor":
    newVersion[1] = parseInt(newVersion[1], 10) + 1;
    newVersion[2] = 0;
    break;
  case "major":
    newVersion[0] = parseInt(newVersion[0], 10) + 1;
    newVersion[1] = 0;
    newVersion[2] = 0;
    break;
  default:
    console.log(`unknown argument '${bump}'`);
    console.log(`must be one of 'patch', 'minor', 'major'`);
    break;
}

fs.writeFileSync(manifestFile, `${newVersion.join(".")}\n`);
