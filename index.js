const core = require("@actions/core");
const childProcess = require("child_process");
const os = require("os");
const { env } = require("process");
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
