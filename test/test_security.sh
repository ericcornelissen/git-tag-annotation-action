#!/bin/bash
# SPDX-License-Identifier: MIT

source ./test/bash_test_tools

GITHUB_OUTPUT='github_output'

function setup {
  rm -f "${GITHUB_OUTPUT}"
}

function test_argument_splitting_context_tag() {
  CONTEXT_TAG='v1.0.0 --format'

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    GITHUB_REF="refs/tags/${CONTEXT_TAG}" \
    run ./src/main.sh

  assert_success
  assert_no_error
  assert_equal "$(cat "${GITHUB_OUTPUT}")" "annotation<<EOF
EOF"
}

function test_argument_splitting_provided_tag() {
  PROVIDED_TAG='v1.0.0 --format'

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    PROVIDED_TAG="${PROVIDED_TAG}" \
    run ./src/main.sh

  assert_success
  assert_no_error
  assert_equal "$(cat "${GITHUB_OUTPUT}")" "annotation<<EOF
EOF"
}

function test_shell_injection_context_tag() {
  CONTEXT_TAG='" && ls . ;'

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    GITHUB_REF="refs/tags/${CONTEXT_TAG}" \
    run ./src/main.sh

  assert_success
  assert_no_error
  assert_equal "$(cat "${GITHUB_OUTPUT}")" "annotation<<EOF
EOF"
}

function test_shell_injection_provided_tag() {
  PROVIDED_TAG='" && ls . ;'

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    PROVIDED_TAG="${PROVIDED_TAG}" \
    run ./src/main.sh

  assert_success
  assert_no_error
  assert_equal "$(cat "${GITHUB_OUTPUT}")" "annotation<<EOF
EOF"
}

testrunner
