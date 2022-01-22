const os = require("os");

const main = require("./src/main.js");

const platform = os.platform();
main(platform);
