#!/bin/bash

export GITHUB_OUTPUT='github_output'

setUp() {
  unset GITHUB_REF
  unset PROVIDED_TAG

  rm -f "${GITHUB_OUTPUT}"
}

test_argument_splitting_context_tag() {
  CONTEXT_TAG='v1.0.0 --format'
  export GITHUB_REF="refs/tags/${CONTEXT_TAG}"

  assertEquals "$(./src/main.sh)" ''
  assertEquals "$(cat "${GITHUB_OUTPUT}")" "annotation<<EOF
EOF"
}

test_argument_splitting_provided_tag() {
  export PROVIDED_TAG='v1.0.0 --format'

  assertEquals "$(./src/main.sh)" ''
  assertEquals "$(cat "${GITHUB_OUTPUT}")" "annotation<<EOF
EOF"
}

test_shell_injection_context_tag() {
  CONTEXT_TAG='" && ls . ;'
  export GITHUB_REF="refs/tags/${CONTEXT_TAG}"

  assertEquals "$(./src/main.sh)" ''
  assertEquals "$(cat "${GITHUB_OUTPUT}")" "annotation<<EOF
EOF"
}

test_shell_injection_provided_tag() {
  export PROVIDED_TAG='" && ls . ;'

  assertEquals "$(./src/main.sh)" ''
  assertEquals "$(cat "${GITHUB_OUTPUT}")" "annotation<<EOF
EOF"
}

. ./test/shunit2
