const core = require("@actions/core");
const childProcess = require("node:child_process");
const os = require("node:os");
const { env } = require("node:process");
const shescape = require("shescape");

const main = require("./src/main.js");

const platform = os.platform();

main({
  childProcess,
  core,
  env,
  platform,
  shescape,
});
