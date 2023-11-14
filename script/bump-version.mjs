// SPDX-License-Identifier: MIT

import * as fs from "node:fs";
import * as path from "node:path";
import * as process from "node:process";

const versionFile = path.resolve("./.version");

const version = fs.readFileSync(versionFile).toString().trim();
const newVersion = version.split(".");

const arg = process.argv[2];
switch (arg) {
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
    throw new Error(
      `unknown argument '${arg}', must be one of 'patch', 'minor', 'major'`
    );
}

fs.writeFileSync(versionFile, `${newVersion.join(".")}\n`);
