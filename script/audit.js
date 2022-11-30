import * as cp from "node:child_process";
import * as process from "node:process";

if (process.argv.length < 3) {
  process.stdout.write("usage:  node script/audit.js <scope> [-e=prop:value]*");
}

const scope = process.argv[2];
const excludes = process.argv
  .slice(3)
  .filter((arg) => arg.startsWith("-e="))
  .map((arg) => arg.replace("-e=", "").split(/(?<=^[^:]*):/));

const rawReport = cp.spawnSync(
  "npm",
  ["audit", "--json", scope === "prod" ? "--omit=dev" : ""],
  { encoding: "utf-8" }
);
const report = JSON.parse(rawReport.stdout);

const x = Object.values(report.vulnerabilities).filter(
  (vulnerability) =>
    !vulnerability.via.some((entry) =>
      excludes.some(([key, value]) => entry[key] === value)
    )
);

console.log(x);
