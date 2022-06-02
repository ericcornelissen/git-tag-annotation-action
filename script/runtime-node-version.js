const fs = require("node:fs");
const path = require("node:path");
const yaml = require("js-yaml");

const actionManifestFile = path.resolve("./action.yml");

const actionManifestRaw = fs.readFileSync(actionManifestFile).toString();
const actionManifest = yaml.load(actionManifestRaw);

const runtimeNodeVersion = actionManifest.runs.using;
console.log(`::set-output name=node-runtime::${runtimeNodeVersion}`);
