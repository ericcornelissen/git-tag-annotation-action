const cp = require("child_process");
const fs = require("fs");
const path = require("path");

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
