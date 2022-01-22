const core = require("@actions/core");
const { exec } = require("child_process");
const shescape = require("shescape");

function isWindows(platform) {
  return platform === "win32";
}

function getOutputFormatWindows() {
  // The format is without quotes on Windows because they will be included in
  // the output of child_process.
  // See: https://github.com/ericcornelissen/git-tag-annotation-action/issues/23
  return "%(contents)";
}

function getOutputFormatUnix() {
  return "'%(contents)'";
}

function main(platform) {
  try {
    let tag = process.env.GITHUB_REF;

    const input = core.getInput("tag");
    if (input) {
      tag = `refs/tags/${input}`;
    }

    let format;
    if (isWindows(platform)) {
      format = getOutputFormatWindows();
    } else {
      format = getOutputFormatUnix();
    }

    exec(
      `git for-each-ref --format=${format} ${shescape.quote(tag)}`,
      (err, stdout) => {
        if (err) {
          core.setFailed(err);
        } else {
          core.setOutput("git-tag-annotation", stdout);
        }
      }
    );
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = main;
