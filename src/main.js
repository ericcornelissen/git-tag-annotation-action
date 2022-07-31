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

function main({ childProcess, core, env, platform, shescape }) {
  try {
    let tag = env.GITHUB_REF;

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

    childProcess.exec(
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

export default main;
