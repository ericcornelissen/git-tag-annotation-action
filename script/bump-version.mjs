import * as fs from "node:fs";
import * as path from "node:path";
import * as process from "node:process";

const manifestFile = path.resolve("./.version");

const manifestRaw = fs.readFileSync(manifestFile).toString();
const version = manifestRaw.trim();

const tmp = version.split(".");

const bump = process.argv[2]
switch (bump) {
case "patch":
  tmp[2] = parseInt(tmp[2], 10) + 1
  break;
case "minor":
  tmp[1] = parseInt(tmp[1], 10) + 1
  tmp[2] = 0
  break;
case "major":
  tmp[0] = parseInt(tmp[0], 10) + 1
  tmp[1] = 0
  tmp[2] = 0
  break;
default:
  console.log(`unknown argument '${bump}'`);
  console.log(`must be one of 'patch', 'minor', 'major'`);
  break;
}

fs.writeFileSync(manifestFile, `${tmp.join(".")}\n`);
