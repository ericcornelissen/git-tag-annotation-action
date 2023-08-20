#!/bin/bash

GITHUB_OUTPUT='github_output'

describe 'Functional tests'

before() {
  rm -f "${GITHUB_OUTPUT}"
}

it_is_used_with_only_the_context_tag() {
  CONTEXT_TAG='v1.0.0'

  stdout="$(
    GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
      GITHUB_REF="refs/tags/${CONTEXT_TAG}" \
      ./src/main.sh
  )"

  test "$?" -eq 0
  test "${stdout}" = ''
  test "$(cat "${GITHUB_OUTPUT}")" = "annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF"
}

it_is_used_with_only_the_provided_tag() {
  PROVIDED_TAG='v1.0.0'

  stdout="$(
    GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
      PROVIDED_TAG="${PROVIDED_TAG}" \
      ./src/main.sh
  )"

  test "$?" -eq 0
  test "${stdout}" = ''
  test "$(cat "${GITHUB_OUTPUT}")" = "annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF"
}

it_is_used_with_both_the_context_and_the_provided_tag() {
  CONTEXT_TAG='v1.0.1'
  PROVIDED_TAG='v1.0.0'
  test "${CONTEXT_TAG}" != "${PROVIDED_TAG}"

  stdout="$(
    GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
      GITHUB_REF="refs/tags/${CONTEXT_TAG}" \
      PROVIDED_TAG="${PROVIDED_TAG}" \
      ./src/main.sh
  )"

  test "$?" -eq 0
  test "${stdout}" = ''
  test "$(cat "${GITHUB_OUTPUT}")" = "annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF"
}
