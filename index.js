import * as childProcess from "node:child_process";
import * as os from "node:os";
import { env } from "node:process";

import * as core from "@actions/core";
import * as shescape from "shescape";

import main from "./src/main.js";

const platform = os.platform();

main({
  childProcess,
  core,
  env,
  platform,
  shescape,
});
