const core = require('@actions/core');
const { exec } = require('child_process');
const shescape = require('shescape');

function main() {
  try {
    let tag = process.env.GITHUB_REF;

    const input = core.getInput('tag');
    if (input) {
      tag = `refs/tags/${input}`;
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
