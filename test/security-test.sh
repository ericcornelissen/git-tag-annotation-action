#!/bin/bash

GITHUB_OUTPUT='github_output'

describe 'Security tests'

before() {
  rm -f "${GITHUB_OUTPUT}"
}

it_prevents_argument_splitting_for_the_context_tag() {
  CONTEXT_TAG='v1.0.0 --format'

  stdout="$(
    GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
      GITHUB_REF="refs/tags/${CONTEXT_TAG}" \
      ./src/main.sh
  )"

  test "$?" -eq 0
  test "${stdout}" = ''
  test "$(cat "${GITHUB_OUTPUT}")" = "annotation<<EOF
EOF"
}

it_prevents_argument_splitting_for_the_provided_tag() {
  PROVIDED_TAG='v1.0.0 --format'

  stdout="$(
    GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
      PROVIDED_TAG="${PROVIDED_TAG}" \
      ./src/main.sh
  )"

  test "$?" -eq 0
  test "${stdout}" = ''
  test "$(cat "${GITHUB_OUTPUT}")" = "annotation<<EOF
EOF"
}

it_prevents_shell_injection_for_the_context_tag() {
  CONTEXT_TAG='" && ls . ;'

  stdout="$(
    GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
      GITHUB_REF="refs/tags/${CONTEXT_TAG}" \
      ./src/main.sh
  )"

  test "$?" -eq 0
  test "${stdout}" = ''
  test "$(cat "${GITHUB_OUTPUT}")" = "annotation<<EOF
EOF"
}

it_prevents_shell_injection_for_the_provided_tag() {
  PROVIDED_TAG='" && ls . ;'

  stdout="$(
    GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
      PROVIDED_TAG="${PROVIDED_TAG}" \
      ./src/main.sh
  )"

  test "$?" -eq 0
  test "${stdout}" = ''
  test "$(cat "${GITHUB_OUTPUT}")" = "annotation<<EOF
EOF"
}
