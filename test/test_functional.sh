#!/bin/bash
source ./test/bash_test_tools

GITHUB_OUTPUT='github_output'

function setup {
  rm -f "${GITHUB_OUTPUT}"
}

function test_only_context_tag() {
  CONTEXT_TAG='v1.0.0'

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    GITHUB_REF="refs/tags/${CONTEXT_TAG}" \
    run ./src/main.sh

  assert_success
  assert_no_output
  assert_no_error
  assert_equal "$(cat "${GITHUB_OUTPUT}")" "annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF"
}

function test_only_provided_tag() {
  PROVIDED_TAG='v1.0.0'

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    PROVIDED_TAG="${PROVIDED_TAG}" \
    run ./src/main.sh

  assert_success
  assert_no_output
  assert_no_error
  assert_equal "$(cat "${GITHUB_OUTPUT}")" "annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF"
}

function test_both_context_and_provided_tag() {
  CONTEXT_TAG='v1.0.1'
  PROVIDED_TAG='v1.0.0'
  assert_not_equal "${CONTEXT_TAG}" "${PROVIDED_TAG}"

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    GITHUB_REF="refs/tags/${CONTEXT_TAG}" \
    PROVIDED_TAG="${PROVIDED_TAG}" \
    run ./src/main.sh

  assert_success
  assert_no_output
  assert_no_error
  assert_equal "$(cat "${GITHUB_OUTPUT}")" "annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF"
}

testrunner
