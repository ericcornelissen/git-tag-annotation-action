#!/usr/bin/env bash

GITHUB_OUTPUT='github_output'

setup() {
  rm -f "${GITHUB_OUTPUT}"
}

test_only_context_tag() {
  CONTEXT_TAG='v1.0.0'

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    GITHUB_REF="refs/tags/${CONTEXT_TAG}" \
    ./src/main.sh

  actual="$(cat "${GITHUB_OUTPUT}")"
  expected="annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF"

  assertEquals "${actual}" "${expected}"
}

test_only_provided_tag() {
  PROVIDED_TAG='v1.0.0'

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    PROVIDED_TAG="${PROVIDED_TAG}" \
    ./src/main.sh

  actual="$(cat "${GITHUB_OUTPUT}")"
  expected="annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF"

  assertEquals "${actual}" "${expected}"
}

test_both_context_and_provided_tag() {
  CONTEXT_TAG='v1.0.1'
  PROVIDED_TAG='v1.0.0'
  assertNotEquals "${CONTEXT_TAG}" "${PROVIDED_TAG}"

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    GITHUB_REF="refs/tags/${CONTEXT_TAG}" \
    PROVIDED_TAG="${PROVIDED_TAG}" \
    ./src/main.sh

  actual="$(cat "${GITHUB_OUTPUT}")"
  expected="annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF"

  assertEquals "${actual}" "${expected}"
}
