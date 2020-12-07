const core = require('@actions/core');
const { exec } = require('child_process');
const shescape = require('shescape');

function main() {
  try {
    let tag = process.env.GITHUB_REF;
    if (core.getInput('tag')) {
      tag = `refs/tags/${core.getInput('tag')}`;
    }

    exec(
      `git for-each-ref --format='%(contents)' ${shescape.quote(tag)}`,
      (err, stdout) => {
        if (err) {
          core.setFailed(err);
        } else {
          core.setOutput('git-tag-annotation', stdout);
        }
      },
    );
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = main;
