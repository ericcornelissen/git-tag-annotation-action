const cp = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const folders = ["./.temp", "./_reports"];

for (const folder of folders) {
  const folderPath = path.resolve(folder);
  deleteFolder(folderPath);
}

function deleteFolder(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true });
  }
}

cp.execFileSync("git", ["checkout", "HEAD", "--", `./lib`]);
