#!/usr/bin/env bash

GITHUB_OUTPUT='github_output'

setup() {
  rm -f "${GITHUB_OUTPUT}"
}

test_argument_splitting_context_tag() {
  CONTEXT_TAG='v1.0.0 --format'

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    GITHUB_REF="refs/tags/${CONTEXT_TAG}" \
    ./src/main.sh

  actual="$(cat "${GITHUB_OUTPUT}")"
  expected="annotation<<EOF
EOF"

  assertEquals "${actual}" "${expected}"
}

test_argument_splitting_provided_tag() {
  PROVIDED_TAG='v1.0.0 --format'

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    PROVIDED_TAG="${PROVIDED_TAG}" \
    ./src/main.sh

  actual="$(cat "${GITHUB_OUTPUT}")"
  expected="annotation<<EOF
EOF"

  assertEquals "${actual}" "${expected}"
}

test_shell_injection_context_tag() {
  CONTEXT_TAG='" && ls . ;'

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    GITHUB_REF="refs/tags/${CONTEXT_TAG}" \
    ./src/main.sh
  assertExitCodeEquals 0
}

test_shell_injection_provided_tag() {
  PROVIDED_TAG='" && ls . ;'

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    PROVIDED_TAG="${PROVIDED_TAG}" \
    ./src/main.sh
  assertExitCodeEquals 0
}
