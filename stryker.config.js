// Check out StrykerJS at: https://stryker-mutator.io/

export default {
  coverageAnalysis: "perTest",
  inPlace: false,
  mutate: ["src/**/*.js"],
  commandRunner: {
    command: "npm run test",
  },

  incremental: false,
  incrementalFile: ".cache/stryker-incremental.json",

  reporters: ["clear-text", "dashboard", "html", "progress"],
  htmlReporter: {
    fileName: "_reports/mutation/index.html",
  },

  thresholds: {
    high: 100,
    low: 100,
    break: 100,
  },

  tempDirName: ".temp/stryker",
  cleanTempDir: true,
};
