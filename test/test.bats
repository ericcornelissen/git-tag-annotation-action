GITHUB_OUTPUT='github_output'

setup() {
  load 'test_helper/bats-support/load'
  load 'test_helper/bats-assert/load'

  rm --force github_output
}

@test "context tag only" {
  CONTEXT_TAG='v1.0.0'

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    GITHUB_REF="refs/tags/${CONTEXT_TAG}" \
    run ./src/main.sh

  actual="$(cat "${GITHUB_OUTPUT}")"
  expected="annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF"

  assert_equal "${actual}" "${expected}"
}

@test "provided tag only" {
  PROVIDED_TAG='v1.0.0'

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    PROVIDED_TAG="${PROVIDED_TAG}" \
    run ./src/main.sh

  actual="$(cat "${GITHUB_OUTPUT}")"
  expected="annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF"

  assert_equal "${actual}" "${expected}"
}

@test "both context and provided tag" {
  CONTEXT_TAG='v1.0.1'
  PROVIDED_TAG='v1.0.0'
  assert_not_equal "${CONTEXT_TAG}" "${PROVIDED_TAG}"

  GITHUB_OUTPUT="${GITHUB_OUTPUT}" \
    GITHUB_REF="refs/tags/${CONTEXT_TAG}" \
    PROVIDED_TAG="${PROVIDED_TAG}" \
    run ./src/main.sh

  actual="$(cat "${GITHUB_OUTPUT}")"
  expected="annotation<<EOF
- Run the Action to get the git tag annotation of the current tag.
- Run the Action to get the git tag annotation of a specified tag.

EOF"

  assert_equal "${actual}" "${expected}"
}
