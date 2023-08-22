#!/bin/bash

export GITHUB_OUTPUT='github_output'

setUp() {
  unset GITHUB_REF
  unset PROVIDED_TAG

  rm -f "${GITHUB_OUTPUT}"
}

test_only_context_tag() {
  CONTEXT_TAG='v1.0.0'
  export GITHUB_REF="refs/tags/${CONTEXT_TAG}"

  assertEquals "$(./src/main.sh)" ''
  assertEquals "$(cat "${GITHUB_OUTPUT}")" "annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF"
}

test_only_provided_tag() {
  export PROVIDED_TAG='v1.0.0'

  assertEquals "$(./src/main.sh)" ''
  assertEquals "$(cat "${GITHUB_OUTPUT}")" "annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF"
}

test_both_context_and_provided_tag() {
  CONTEXT_TAG='v1.0.1'
  PROVIDED_TAG='v1.0.0'
  assertNotEquals "${CONTEXT_TAG}" "${PROVIDED_TAG}"

  export PROVIDED_TAG="${PROVIDED_TAG}"
  export GITHUB_REF="refs/tags/${CONTEXT_TAG}"

  assertEquals "$(./src/main.sh)" ''
  assertEquals "$(cat "${GITHUB_OUTPUT}")" "annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF"
}

. ./test/shunit2
