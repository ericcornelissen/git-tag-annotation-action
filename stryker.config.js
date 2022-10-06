// Check out StrykerJS at: https://stryker-mutator.io/

const reportDir = "_reports/mutation";

export default {
  coverageAnalysis: "perTest",
  inPlace: false,
  mutate: ["src/**/*.js"],
  commandRunner: {
    command: "npm run test",
  },

  incremental: false,
  incrementalFile: `${reportDir}/stryker-incremental.json`,

  reporters: ["clear-text", "dashboard", "html", "progress"],
  htmlReporter: {
    fileName: `${reportDir}/index.html`,
  },

  thresholds: {
    high: 100,
    low: 100,
    break: 100,
  },

  tempDirName: ".temp/stryker",
  cleanTempDir: false,
};
