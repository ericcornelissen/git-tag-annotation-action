// SPDX-License-Identifier: MIT

import * as fs from "node:fs";
import * as path from "node:path";
import * as process from "node:process";

const versionFile = path.resolve("./.version");
const changelogFile = path.resolve("./CHANGELOG.md");

const version = fs.readFileSync(versionFile).toString().trim();
const versionHeader = `## [${version}]`;

const changelog = fs.readFileSync(changelogFile).toString();
if (!changelog.includes(versionHeader)) {
  throw new Error(`${version} missing from CHANGELOG`);
}

const startIndex = changelog.indexOf(versionHeader) + versionHeader.length + 13;
const endIndex = startIndex + changelog.substring(startIndex).indexOf("## [");

const releaseNotes = changelog.substring(startIndex, endIndex);
process.stdout.write(releaseNotes);
process.stdout.write("\n");
